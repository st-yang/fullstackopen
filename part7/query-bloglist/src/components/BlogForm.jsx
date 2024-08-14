import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../context/NotificationContext'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = () => {
  const notification = useNotification()
  const queryClient = useQueryClient()
  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()
      notification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    },
    onError: (error) => {
      notification(error.response.data.error)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url, likes: 0 })
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
