// Централизованная обработка ошибок

const { ERROR_DEFAULT } = require('../utils/errors/codes');
const { MSG_ERROR_DEFAULT } = require('../utils/errors/codes');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = ERROR_DEFAULT, message } = err;
  console.log('errorHandler', err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === ERROR_DEFAULT
        ? MSG_ERROR_DEFAULT
        : message,
    });
};

module.exports = { errorHandler };
