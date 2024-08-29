const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'listedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersListed' })

module.exports = {
  Blog,
  User,
  ReadingList,
}
