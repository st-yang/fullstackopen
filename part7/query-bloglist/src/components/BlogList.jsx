import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return blogs
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => <Blog key={blog.id} user={user} blog={blog} />)
}

export default BlogList
