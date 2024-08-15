import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
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
    <div>
      {user === null ? <h2>Log in to application</h2> : <h2>blogs</h2>}
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={() => dispatch(logout())}>logout</button>
          </p>
          <Routes>
            <Route
              path='/'
              element={
                <div>
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
