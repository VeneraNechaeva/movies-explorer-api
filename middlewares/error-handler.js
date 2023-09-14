// Централизованная обработка ошибок

const { ERROR_DEFAULT } = require('../utils/errors/codes');

const errorHandler = (err, req, res) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = ERROR_DEFAULT, message } = err;
  console.log(err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === ERROR_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = { errorHandler };
