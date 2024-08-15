import { useQueryClient } from '@tanstack/react-query'
import BlogItem from './BlogItem'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  return blogs
    ? blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => <BlogItem key={blog.id} blog={blog} />)
    : null
}

export default BlogList
