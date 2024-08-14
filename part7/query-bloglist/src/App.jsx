import { useEffect } from 'react'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useInitializeUser, useLogout, useUserValue } from './context/UserContext'

const App = () => {
  const initializeUser = useInitializeUser()
  const user = useUserValue()
  const logout = useLogout()

  useEffect(() => {
    initializeUser()
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
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
