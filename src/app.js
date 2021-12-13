if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors =require("cors")

const moviesRouter = require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");


app.use(cors())
app.use(express.json())

const errorHandler = require("./errors/errorHandler")
const notFound = require("./errors/notFound")


app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);


//Not Found Handler
app.use(notFound)

// Error handler
app.use(errorHandler)

module.exports = app;
