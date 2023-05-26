const totalLikes = require("../src/utils/list_helper").totalLikes;

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "anisodfnoaifw",
      title: "Blog 1",
      url: "www.blog1.com",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "fafjafjafjf",
      title: "Blog 22",
      url: "www.blog22.com",
      likes: 10,
      __v: 0,
    },
    {
      _id: "sfafaf",
      title: "Blog 33",
      url: "www.blog33.com",
      likes: 20,
      __v: 0,
    },
    {
      _id: "asasasasa",
      title: "Blog 44",
      url: "www.blog44.com",
      likes: 30,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    const likesOfOneBlog = listWithOneBlog[0].likes;
    expect(result).toBe(likesOfOneBlog);
  });

  test("when list has multiple blogs, equals the likes of all blogs", () => {
    const result = totalLikes(listWithMultipleBlogs);
    const likesOfMultipleBlogs = 60; // no clever tricks this time around
    expect(result).toBe(likesOfMultipleBlogs);
  });

  test("when list has no blogs, equals zero", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });
});
