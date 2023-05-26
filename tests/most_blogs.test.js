const mostBlogs = require("../src/utils/list_helper").mostBlogs;

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

describe("most blogs by an author", () => {
  test("when list has only one blog, it returns that author", () => {
    const result = mostBlogs(listWithOneBlog);
    const author = "Jere Pohjola";
    expect(result).toEqual({ author, blogs: 1 });
  });

  test("when list has multiple blogs, it returns the author with most blogs", () => {
    const result = mostBlogs(listWithMultipleBlogs);
    const author = "Sally Siika";
    expect(result).toEqual({ author, blogs: 3 });
  });

  test("When list is empty, it returns an empty object", () => {
    const result = mostBlogs([]);
    expect(result).toEqual({});
  });
});
