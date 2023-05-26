const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (best, current) => {
    return best.likes > current.likes ? best : current;
  };
  return blogs.reduce(reducer, { likes: 0 });
};

const mostBlogs = (blogs) => {
  let best = {};
  let blogRecord = 0;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    const numberOfBlogs = blogs.filter((b) => b.author === blog.author).length;
    if (numberOfBlogs > blogRecord) {
      best = { author: blog.author, blogs: numberOfBlogs };
      blogRecord = numberOfBlogs;
    }
  }

  return best;
};

const mostLikes = (blogs) => {
  let best = {};
  let likeRecord = 0;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    const numberOfLikes = blogs
      .filter((b) => b.author === blog.author)
      .reduce((sum, blog) => sum + blog.likes, 0);
    if (numberOfLikes > likeRecord) {
      best = { author: blog.author, likes: numberOfLikes };
      likeRecord = numberOfLikes;
    }
  }
  return best;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
