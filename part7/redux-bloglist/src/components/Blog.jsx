import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

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

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    dispatch(commentBlog(blog, comment))

    event.target.comment.value = ''
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <Button variant='contained' color='primary' onClick={handleLikeBlog}>
            like
          </Button>
        </div>
        {blog.user && <div>added by {blog.user.name}</div>}
        {showRemove && (
          <Button variant='contained' color='primary' onClick={handleRemoveBlog}>
            remove
          </Button>
        )}
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <TextField data-testid='comment' name='comment' label='comment' />
        <Button variant='contained' color='primary' type='submit'>
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
