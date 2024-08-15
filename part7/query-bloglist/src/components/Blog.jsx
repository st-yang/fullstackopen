import { useMatch } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../context/NotificationContext'
import { useUserValue } from '../context/UserContext'
import blogService from '../services/blogs'

const Blog = () => {
  const notification = useNotification()
  const user = useUserValue()

  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id !== blog.id ? b : blog)),
      )

      notification(`You liked '${blog.title}' by ${blog.author}`)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )

      notification(`blog ${blog.title} by ${blog.author} removed`)
    },
  })

  if (!blog) return null

  const handleLikeBlog = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }
  const showRemove = user && (blog.user === user.id || blog.user.id === user.id)

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes<button onClick={handleLikeBlog}>like</button>
        </div>
        {blog.user && <div>added by {blog.user.name}</div>}
        {showRemove && <button onClick={handleRemoveBlog}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
