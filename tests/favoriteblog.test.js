const favoriteBlog = require("../src/utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
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

  test("when list has only one blog, it returns that blog", () => {
    const result = favoriteBlog(listWithOneBlog);
    const favBlog = listWithOneBlog[0];
    expect(result).toEqual(favBlog);
  });

  test("when list has multiple blogs, it returns the blog with most likes", () => {
    const result = favoriteBlog(listWithMultipleBlogs);
    const favBlog = listWithMultipleBlogs[2];
    expect(result).toEqual(favBlog);
  });
});
