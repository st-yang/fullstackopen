import { useState, useEffect } from 'react'
import { useNotification } from './context/NotificationContext'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notification = useNotification()

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const loginForm = () => <LoginForm handleLogin={handleLogin} />

  return (
    <div>
      {user === null ? <h2>Log in to application</h2> : <h2>blogs</h2>}
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm />
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
