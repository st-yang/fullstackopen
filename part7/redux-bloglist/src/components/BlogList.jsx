import { useSelector } from 'react-redux'
import BlogItem from './BlogItem'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return blogs
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => <BlogItem key={blog.id} blog={blog} />)
}

export default BlogList
