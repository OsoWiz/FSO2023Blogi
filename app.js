const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
const middleware = require("./src/utils/middleware");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./src/controllers/blogs");
const usersRouter = require("./src/controllers/users");
const loginRouter = require("./src/controllers/login");

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

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./src/controllers/test");
  app.use("/api/testing", testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
