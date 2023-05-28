const Blog = require("../src/models/blog");
const User = require("../src/models/user");

const initialBlogs = [
  {
    title: "Testi 1",
    author: "Testaaja 1",
    url: "www.testi1.fi",
    likes: 1,
  },
  {
    title: "Testi 2",
    author: "Testaaja 2",
    url: "www.testi2.fi",
    likes: 2,
  },
  {
    title: "Testi 3",
    author: "Testaaja 3",
    url: "www.testi3.fi",
    likes: 3,
  },
];

const initialUsers = [
  {
    username: "testaaja1",
    name: "Testaaja 1",
    passwordHash: "hash1",
  },
  {
    username: "testaaja2",
    name: "Testaaja 2",
    passwordHash: "hash2",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const signupUser = async (api, user) => {
  const userAns = await api.post("/api/users").send(user);
  return userAns.body;
};

const loginUser = async (api, user) => {
  const response = await api.post("/api/login").send(user);
  return response.body;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  signupUser,
  loginUser,
};
