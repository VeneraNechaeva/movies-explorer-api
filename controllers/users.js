// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

// Импортируем переменные окружения
const { NODE_ENV, JWT_SECRET } = process.env;

// Импортируем модуль jsonwebtoken для создания токенов
const jwt = require('jsonwebtoken');

const utils = require('../utils/utils');

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = undefined;
      res.status(utils.CREATE_SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new utils.ExistsEmailError('Пользователь с таким email  уже существует.'));
      }
      console.log('createUser', err);
      next();
    });
};

/// /// ///
// Создаём контроллер аутентификации
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new utils.IncorrectAuthorizationError('Передан неверный логин или пароль.');
      }
      // создадим токен
      const token = jwt.sign(
        { _id: user._id.toString() },
        // берем секретный ключ из переменных окружения
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }, // токен будет просрочен через неделю
      );
      // сохраним токен в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        // вернем токен
      }).send({ token });
    })
    .catch(next);
};

// Создаём контроллер удаления jwt из куков
module.exports.signOut = (req, res, next) => {
  try {
    res.clearCookie('jwt')
      .send({});
  } catch (err) {
    next(err);
  }
};

// Контроллер для получения информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

/// /// ///
module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new utils.NotFoundError('Пользователь не найден.');
      }
      res.send(user);
    })
    .catch(next);
};
