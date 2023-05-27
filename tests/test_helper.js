const Blog = require("../src/models/blog");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
