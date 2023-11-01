const { NotFoundError } = require('./errors/not-found-error');
const { MSG_NOT_FOUND } = require('./errors/codes');

// Обработка неправильного пути
const checkIncorrectPath = (req, res, next) => {
  next(new NotFoundError(MSG_NOT_FOUND));
};

// Регулярное выражение для валидации ссылки
const validateLink = /https?:\/\/([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

module.exports = { checkIncorrectPath, validateLink };
