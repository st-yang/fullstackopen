import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'
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
          <TextField data-testid='title' name='title' label='title' />
        </div>
        <div>
          <TextField data-testid='author' name='author' label='author' />
        </div>
        <div>
          <TextField data-testid='url' name='url' label='url' />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          create
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
