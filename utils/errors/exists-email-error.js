const { ERROR_EXISTS_EMAIL } = require('./codes');

// Собственный конструкторы ошибок
class ExistsEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_EXISTS_EMAIL;
  }
}

module.exports = { ExistsEmailError };
