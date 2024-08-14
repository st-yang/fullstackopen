import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const buttonLabel = expanded ? 'hide' : 'view'

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }
  const showRemove = user && blog.user.username === user.username

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
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {showRemove && <button onClick={removeBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
}

export default Blog
