const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../src/models/blog");

const api = supertest(app);
// initialize test setup
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("right amount of blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(res.body).toHaveLength(helper.initialBlogs.length);
    });
});

test("Identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("A blog can be added, and the amoung of blogs grow", async () => {
  const newBlog = {
    title: "Testi Added",
    author: "Mysteryadder",
    url: "www.testiadded.org",
    likes: 4,
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("Blog that has no likes property set, will have it set to 0", async () => {
  const newBlog = {
    title: "Likes test",
    author: "Likes tester",
    url: "www.likestest.com",
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test("Blog without title or url is not added", async () => {
  const noTitleBlog = {
    author: "No titleauthor",
    url: "www.notitle.com",
    likes: 1,
  };
  const noUrlBlog = {
    title: "No urltitle",
    author: "No urlauthor",
    likes: 1,
  };
  await api.post("/api/blogs").send(noTitleBlog).expect(400);
  await api.post("/api/blogs").send(noUrlBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
