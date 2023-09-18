const { CREATE_SUCCESS } = require('../utils/errors/codes');
const { NotFoundError } = require('../utils/errors/not-found-error');
const { DeleteCardError } = require('../utils/errors/delete-card-error');
const { MSG_MOVIE_NOT_FOUND, MSG_MOVIE_DELETE_CARD } = require('../utils/errors/codes');

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
    .then((movie) => res.status(CREATE_SUCCESS).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MSG_MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() === userId) {
        Movie.deleteOne(movie)
          .then((movieAfterDel) => res.send(movieAfterDel))
          .catch((err) => Promise.reject(err));
      } else {
        next(new DeleteCardError(MSG_MOVIE_DELETE_CARD));
      }
    })
    .catch(next);
};
