const router = require('express').Router();

// Импорт контроллеров
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// Импорт валидаторов запросов
const {
  createCardValidator, deleteCardValidator,
} = require('../validators/movie_validator');

// Возвращает все сохранённые текущим пользователем фильмы
router.get('/movies', getMovies);

// Создаёт фильм с переданными в теле country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', createCardValidator, createMovie);

// Удаляет сохранённый фильм по id
router.delete('/movies/_id', deleteCardValidator, deleteMovie);

module.exports = router;
