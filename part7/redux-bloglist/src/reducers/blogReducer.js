import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(a => a.id === updatedBlog.id ? updatedBlog : a)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  }
})

export const { updateBlog, appendBlog, deleteBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch(updateBlog(updatedBlog))
    dispatch(setNotification(`You liked '${updatedBlog.title}' by ${updatedBlog.author}`))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`blog ${blog.title} by ${blog.author} removed`))
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(blog.id, { comment })
    dispatch(updateBlog(updatedBlog))
    dispatch(setNotification(`You commented '${updatedBlog.title}' by ${updatedBlog.author}`))
  }
}

export default blogSlice.reducer