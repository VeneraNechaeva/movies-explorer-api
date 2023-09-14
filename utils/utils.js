const { NotFoundError } = require('./errors/not-found-error');

// Обработка неправильного пути
const checkIncorrectPath = (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
};

// Регулярное выражение для валидации ссылки
const validateLink = /https?:\/\/([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

module.exports = { checkIncorrectPath, validateLink };
