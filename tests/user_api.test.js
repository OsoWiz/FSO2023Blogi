const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../src/models/user");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

test("Right amount of users are returned as a json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(res.body).toHaveLength(helper.initialUsers.length);
    });
});

test("A proper user is created", async () => {
  const newUser = {
    username: "testaaja3",
    name: "Testaaja 3",
    password: "salasana3",
  };
  await api.post("/api/users").send(newUser).expect(201);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
});

test("User with too short password is not created", async () => {
  const falseUser = {
    username: "testaaja3",
    name: "Testaaja 3",
    password: "sa",
  };
  await api.post("/api/users").send(falseUser).expect(400);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});

test("User with no password is not created", async () => {
  const falseUser = {
    username: "testaaja3",
    name: "Testaaja 3",
  };
  await api.post("/api/users").send(falseUser).expect(400);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});

test("User with no username is not created", async () => {
  const falseUser = {
    name: "Testaaja 3",
    password: "salasana3",
  };
  await api.post("/api/users").send(falseUser).expect(400);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});

test("Two users with the same username are not created", async () => {
  const userWithSameUsername = {
    username: "testaaja1",
    name: "Testaaja 3",
    password: "salasana3",
  };
  await api.post("/api/users").send(userWithSameUsername).expect(400);
  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});
