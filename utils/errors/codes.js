// Ошибки
const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;
const CREATE_SUCCESS = 201;
const ERROR_INCORRECT_LOGIN_OR_PASSWORD = 401;
const ERROR_DELETE_CARD = 403;
const ERROR_EXISTS_EMAIL = 409;

// Сообщения ответов
const MSG_ERROR_DEFAULT = 'На сервере произошла ошибка.';
const MSG_NOT_FOUND = 'Страница не найдена!';
const MSG_INCORRECT_LOGIN_OR_PASSWORD = 'Передана неверная почта или пароль.';

const MSG_USER_AUTOHORIZATION = 'Необходима авторизация.';
const MSG_USER_NOT_FOUND = 'Пользователь не найден.';
const MSG_USER_EXISTS_EMAI = 'Пользователь с таким email уже существует.';

const MSG_MOVIE_NOT_FOUND = 'Фильм не найден.';
const MSG_MOVIE_DELETE_CARD = 'Нельзя удалять чужие карточки с фильмом!';

module.exports = {
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  CREATE_SUCCESS,
  ERROR_INCORRECT_LOGIN_OR_PASSWORD,
  ERROR_DELETE_CARD,
  ERROR_EXISTS_EMAIL,

  MSG_ERROR_DEFAULT,
  MSG_NOT_FOUND,
  MSG_INCORRECT_LOGIN_OR_PASSWORD,
  MSG_USER_AUTOHORIZATION,
  MSG_USER_NOT_FOUND,
  MSG_USER_EXISTS_EMAI,
  MSG_MOVIE_NOT_FOUND,
  MSG_MOVIE_DELETE_CARD,
};
