import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../context/NotificationContext'
import { useUserValue } from '../context/UserContext'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const buttonLabel = expanded ? 'hide' : 'view'

  const notification = useNotification()
  const queryClient = useQueryClient()

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

  const handleLikeBlog = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }
  const user = useUserValue()
  const showRemove = user && (blog.user === user.id || blog.user.id === user.id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={toggleExpanded}>{buttonLabel}</button>
      </div>
      {expanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLikeBlog}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {showRemove && <button onClick={handleRemoveBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
