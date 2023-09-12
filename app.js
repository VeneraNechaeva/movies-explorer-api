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

const { createUser, login, signOut } = require('./controllers/users');
const auth = require('./middlewares/auth');

const utils = require('./utils/utils');

// Импорт валидаторов запросов
const { loginValidator, createUserValidator } = require('./validators/user_validator');

// Импортируем роуты
const routerUser = require('./routes/users');
const routerMovie = require('./routes/movies');

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

// Роуты для логина и регистрации
app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

// Авторизация (Защищаем роуты авторизацией)
app.use(auth);

app.post('/signout', signOut);

app.use('/', routerUser); // запускаем
app.use('/', routerMovie); // запускаем

app.use(utils.checkIncorrectPath); // запускаем обработку неправильного пути

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

// Обработчик ошибок celebrate
app.use(errors());

// Подключаем централизованный обработчик ошибок
app.use(errorHandler);

// Подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(DB_URL);
});
