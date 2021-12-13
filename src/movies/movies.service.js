const knex = require("../db/connection");


function read(movie_id) {
  return knex("movies")
    .where({ movie_id })
    .first();
}



function list(isShowing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (isShowing) {
        queryBuilder
          .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}




module.exports = {
  list,
  read,
};