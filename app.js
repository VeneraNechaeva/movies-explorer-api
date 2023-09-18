// Импортируем модуль dotenv, чтобы загрузить файл .env ( с переменными окружения) в Node.js
require('dotenv').config();

// Импортируем express
const express = require('express');

// Подключаем mongoose
const mongoose = require('mongoose');

// Подключаем модуль cookie-parser, что бы извлечь данные из заголовка Cookie
const cookieParser = require('cookie-parser');

// Импорт обработчика ошибок celebrate
const { errors } = require('celebrate');

const bodyParser = require('body-parser');

// Импорт библиотеки helmet для защиты приложения  Node.js от
// уязвимостей и кибератак
const helmet = require('helmet');

// Импорт логгеров
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Подключаем лимитер запросов ( для ограничения количества запросов )
const { limiter } = require('./utils/limiter');

// Импорт централизованного обработка ошибок
const { errorHandler } = require('./middlewares/error-handler');

// Импорт CORS
const { corsCheck } = require('./middlewares/cors-check');

const utils = require('./utils/utils');

const router = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
// Cоздание приложения методом express
const app = express();

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(corsCheck); // подключаем CORS

app.use(requestLogger); // подключаем логгер запросов, до всех обработчиков роутов

app.use(limiter); // применяем limiter для ограничения скорости ко всем запросам

app.use(router);

app.use(utils.checkIncorrectPath); // запускаем обработку неправильного пути

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

// Обработчик ошибок celebrate
app.use(errors());

// Подключаем централизованный обработчик ошибок
app.use(errorHandler);

// Подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(DB_URL);
});
