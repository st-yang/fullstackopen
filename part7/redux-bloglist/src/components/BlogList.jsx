import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => blogs)

  return blogs
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => <Blog key={blog.id} user={user} blog={blog} />)
}

export default BlogList
