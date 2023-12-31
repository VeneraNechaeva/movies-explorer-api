const router = require('express').Router();

// Импорт контроллеров
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

// Импорт валидаторов запросов
const { updateUserValidator } = require('../validators/user_validator');

// Bозвращает информацию о пользователе (email и имя)
router.get('/users/me', getCurrentUser);

// Обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUserValidator, updateUser);

module.exports = router;
