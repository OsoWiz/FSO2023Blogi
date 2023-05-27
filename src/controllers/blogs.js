const Blog = require("./../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  // refactor to async/await
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  // refactor to async/await
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
