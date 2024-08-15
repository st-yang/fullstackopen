import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { useInitializeUser, useUserValue } from './context/UserContext'
import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const initializeUser = useInitializeUser()
  const user = useUserValue()

  useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  useEffect(() => {
    initializeUser()
  }, [])

  return (
    <div>
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
    </div>
  )
}

export default App
