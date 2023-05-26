const Blog = require("./../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response) => {
  find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    body,
  });
  blog
    .save()
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
