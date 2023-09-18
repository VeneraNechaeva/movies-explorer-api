// Защита роутов авторизацией (Авторизационный мидлвэр)
const jwt = require('jsonwebtoken');

// Импортируем переменные окружения
const { NODE_ENV, JWT_SECRET } = process.env;

const { IncorrectAuthorizationError } = require('../utils/errors/incorrect-authorization-error');
const { MSG_USER_AUTOHORIZATION } = require('../utils/errors/codes');

module.exports = (req, res, next) => {
  // достаём токен из Куки
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    // верифицируем токен (verify вернёт пейлоуд токена, если он прошёл проверку)
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new IncorrectAuthorizationError(MSG_USER_AUTOHORIZATION));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
