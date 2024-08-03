const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs.length === 0 ? {} : blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  let most = -1
  let author = ''
  let authorCount = new Map()

  blogs.forEach((blog) => {
    // count blog for this author
    if (authorCount.has(blog.author)) {
      authorCount.set(blog.author, authorCount.get(blog.author) + 1)
    } else {
      authorCount.set(blog.author, 1)
    }

    // update most blogs if larger
    if (authorCount.get(blog.author) > most) {
      most = authorCount.get(blog.author)
      author = blog.author
    }
  })

  return { author, blogs: most }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  let most = -1
  let author = ''
  let likeCount = new Map()

  blogs.forEach((blog) => {
    // count blog likes for this author
    if (likeCount.has(blog.author)) {
      likeCount.set(blog.author, likeCount.get(blog.author) + blog.likes)
    } else {
      likeCount.set(blog.author, blog.likes)
    }

    // update most likes if larger
    if (likeCount.get(blog.author) > most) {
      most = likeCount.get(blog.author)
      author = blog.author
    }
  })

  return { author, likes: most }
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}