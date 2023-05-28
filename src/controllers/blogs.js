const Blog = require("./../models/blog");
const User = require("./../models/user");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  // refactor to async/await
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  if (!request.userid) {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  const user = await User.findById(request.userid);
  if (!user) {
    return response.status(401).json({
      error: "invalid user",
    });
  }
  // refactor to async/await
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  // refactor to async/await
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({
      error: "blog not found",
    });
  }

  if (blog.user.toString() !== request.userid.toString()) {
    return response.status(401).json({
      error: "invalid user",
    });
  } else {
    await Blog.findByIdAndRemove(request.params.id);
  }
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  // refactor to async/await
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
