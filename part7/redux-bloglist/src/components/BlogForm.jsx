import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    dispatch(createBlog({ title, author, url, likes: 0 }))
    blogFormRef.current.toggleVisibility()

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title: <input data-testid='title' name='title' />
        </div>
        <div>
          author: <input data-testid='author' name='author' />
        </div>
        <div>
          url: <input data-testid='url' name='url' />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
