const { ERROR_INCORRECT_LOGIN_OR_PASSWORD } = require('./codes');

// Собственный конструкторы ошибок
class IncorrectAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_LOGIN_OR_PASSWORD; // Передан неверный логин или пароль
  }
}

module.exports = { IncorrectAuthorizationError };
