import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const buttonLabel = expanded ? 'hide' : 'view'

  const handleLikeBlog = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }
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
  user: PropTypes.object,
}

export default Blog
