import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [])

  return (
    <Container>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Menu />
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <h2>blogs</h2>
                  <BlogForm />
                  <BlogList />
                </div>
              }
            />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </div>
      )}
    </Container>
  )
}

export default App
