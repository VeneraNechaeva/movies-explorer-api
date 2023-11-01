const { ERROR_NOT_FOUND } = require('./codes');

// Собственный конструкторы ошибок
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND; // Пользователь/ карточка не найдена.
  }
}

module.exports = { NotFoundError };
