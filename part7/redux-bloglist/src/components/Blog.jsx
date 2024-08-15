import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!blog) return null

  const handleLikeBlog = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }
  const showRemove = user && (blog.user === user.id || (blog.user && blog.user.id === user.id))

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
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
