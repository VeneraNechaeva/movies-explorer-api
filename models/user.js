const mongoose = require('mongoose');

// Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

const validator = require('validator');

const utils = require('../utils/utils');

// Создаём схему
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
}, { versionKey: false });

// Добавим собственный метод findUserByCredentials схеме пользователя
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // проверяем есть ли пользователь в базе с указанной почтой
  return this.findOne({ email }).select('+password') // this — это модель User
    // eslint-disable-next-line consistent-return
    .then((user) => {
      // пользователь не найден — отклоняем промис
      // с ошибкой и переходим в блок catch
      if (!user) {
        return Promise.reject(new utils.IncorrectAuthorizationError('Неправильные почта или пароль'));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new utils.IncorrectAuthorizationError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// Создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);