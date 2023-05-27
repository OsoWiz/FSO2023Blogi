const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
const middleware = require("./src/utils/middleware");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./src/controllers/blogs");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
