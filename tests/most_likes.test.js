const mostLikes = require("../src/utils/list_helper").mostLikes;

const listWithOneBlog = [
  {
    _id: "123",
    title: "Blog 1",
    author: "Jere Pohjola",
    url: "www.blog1.com",
    likes: 1,
    __v: 0,
  },
];

const listWithMultipleBlogs = [
  {
    _id: "fafjafjafjf",
    title: "Blog 22",
    author: "Sally Siika",
    url: "www.blog22.com",
    likes: 10,
    __v: 0,
  },
  {
    _id: "sfafaf",
    title: "Blog 33",
    author: "Sally Siika",
    url: "www.blog33.com",
    likes: 20,
    __v: 0,
  },
  {
    _id: "asasasasa",
    title: "Blog 44",
    author: "Sally Siika",
    url: "www.blog44.com",
    likes: 30,
    __v: 0,
  },
  {
    _id: "666",
    title: "Blog 666",
    author: "The Demon King",
    url: "www.blog666.com",
    likes: 666,
    __v: 0,
  },
];

describe("most likes", () => {
  test("When list has a single blog it returns the author and the likes of that blog", () => {
    const result = mostLikes(listWithOneBlog);
    const author = "Jere Pohjola";
    const likes = 1;
    expect(result).toEqual({ author, likes });
  });

  test("When list has multiple blogs it returns the author with most likes", () => {
    const result = mostLikes(listWithMultipleBlogs);
    const author = "The Demon King";
    const likes = 666;
    expect(result).toEqual({ author, likes });
  });
});
