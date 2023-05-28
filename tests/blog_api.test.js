const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../src/models/blog");
const User = require("../src/models/user");
const blog = require("../src/models/blog");

const api = supertest(app);
// initialize test setup
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
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
  const testUser = {
    username: "testilegenda1",
    name: "testilegenda1",
    password: "salasana",
  };

  const user = await helper.signupUser(api, testUser);
  const token = await helper.loginUser(api, testUser);

  const newBlog = {
    title: "Testi Added",
    author: "Mysteryadder",
    url: "www.testiadded.org",
    likes: 4,
    userId: user.id,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .send(newBlog)
    .expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("Blog that has no likes property set, will have it set to 0", async () => {
  const testUser = {
    username: "testilegenda1",
    name: "testilegenda1",
    password: "salasana",
  };

  const user = await helper.signupUser(api, testUser);
  const token = await helper.loginUser(api, testUser);

  const newBlog = {
    title: "Likes test",
    author: "Likes tester",
    url: "www.likestest.com",
    userId: user.id,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .send(newBlog)
    .expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test("Blog without title or url is not added", async () => {
  const testUser = {
    username: "testilegenda1",
    name: "testilegenda1",
    password: "salasana",
  };

  const user = await helper.signupUser(api, testUser);
  const token = await helper.loginUser(api, testUser);

  const noTitleBlog = {
    author: "No titleauthor",
    url: "www.notitle.com",
    likes: 1,
    userId: user.id,
  };
  const noUrlBlog = {
    title: "No urltitle",
    author: "No urlauthor",
    likes: 1,
    userId: user.id,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .send(noTitleBlog)
    .expect(400);
  await api
    .post("/api/blogs")
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .send(noUrlBlog)
    .expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("A blog can be deleted from the database", async () => {
  const testUser = {
    username: "testilegenda1",
    name: "testilegenda1",
    password: "salasana",
  };

  const user = await helper.signupUser(api, testUser);
  const token = await helper.loginUser(api, testUser);
  console.log(user);
  const testBlog = {
    title: "Testi Added",
    author: testUser.name,
    url: "www.testiadded.org",
    likes: 4,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .send(testBlog)
    .expect(201);

  const blogs = await helper.blogsInDb();

  const blogToDelete = blogs[blogs.length - 1];
  console.log(blogToDelete);
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `${token.token}`)
    .set("Content-Type", "application/json")
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length); // one deletion and one addition
});

test("A blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    title: "Updated title",
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
  };
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1);
  expect(blogsAtEnd[0].title).toBe("Updated title");
});

afterAll(async () => {
  await mongoose.connection.close();
});
