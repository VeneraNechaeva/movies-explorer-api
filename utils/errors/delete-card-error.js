const { ERROR_DELETE_CARD } = require('./codes');

// Собственный конструкторы ошибок
class DeleteCardError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DELETE_CARD; // Попытка удалить чужую карточку с фильмом
  }
}

module.exports = { DeleteCardError };
