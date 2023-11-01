// Импорт иблиотеки для валидации данных запроса
const { celebrate, Joi } = require('celebrate');

const { validateLink } = require('../utils/utils');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(validateLink),
    trailerLink: Joi.string().required().pattern(validateLink),
    thumbnail: Joi.string().required().pattern(validateLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

/// /// ///
module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
