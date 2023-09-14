const { ERROR_INCORRECT_DATA } = require('./codes');

// Собственный конструкторы ошибок
class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_DATA; // Переданы некорректные данные.
  }
}

module.exports = { IncorrectDataError };
