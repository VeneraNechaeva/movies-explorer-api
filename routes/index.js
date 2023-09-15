const router = require('express').Router();

const auth = require('../middlewares/auth');
// Импорт валидаторов запросов
const { loginValidator, createUserValidator } = require('../validators/user_validator');
const { createUser, login, signOut } = require('../controllers/users');
// Импортируем роуты
const routerUser = require('./users');
const routerMovie = require('./movies');

// Роуты для логина и регистрации
router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

// Авторизация (Защищаем роуты авторизацией)
router.use(auth);

router.post('/signout', signOut);

router.use(routerUser); // запускаем
router.use(routerMovie); // запускаем

module.exports = router;
