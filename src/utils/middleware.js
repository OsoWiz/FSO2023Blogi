const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.path);
  logger.info("Body:", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: `Validation error: ${error.message}` });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid or missing token",
    });
  }
  next(error);
};

const userExtractor = (request, response, next) => {
  request.userid = null;
  const authorization = request.get("authorization");
  if (authorization) {
    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    if (decodedToken.id) {
      request.username = decodedToken.username;
      request.userid = decodedToken.id;
    } else {
      return response.status(401).json({
        error: "invalid token",
      });
    }
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
