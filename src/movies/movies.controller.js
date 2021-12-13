const service = require("./movies.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const numberMovieId = Number(movieId);
    const data = await service.read(numberMovieId);
    if (data) {
      res.locals.movie = data;
      return next();
    }
    next({
      status: 404,
      message: "Movie does not exist.",
    });
  }


async function read(req, res) {
    res.json({ data: res.locals.movie });
  }


async function list(req, res) {
    const data = await service.list(req.query.is_showing);
    res.json({ data: data });
  }


module.exports = {
read: [asyncErrorBoundary(movieExists), read],
list: asyncErrorBoundary(list),
};