const utils = require('../utils/utils');

const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(utils.CREATE_SUCCESS).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  Movie.findById(_id)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        throw new utils.NotFoundError('Фильм не найден.');
      }
      if (movie.owner.toString() === userId) {
        Movie.deleteOne(movie)
          .then((movieAfterDel) => res.send(movieAfterDel))
          .catch((err) => Promise.reject(err));
      } else {
        return Promise.reject(new utils.DeleteCardError('Нельзя удалять чужие карточки с фильмом!'));
      }
    })
    .catch(next);
};
