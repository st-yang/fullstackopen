import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  // create blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // login state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      updateMessage('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const createBlog = (event) => {
    blogFormRef.current.toggleVisibility()

    event.preventDefault()

    const blogObject = { title, author, url, likes: 0 }
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      updateMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )

  return (
    <div>
      {user === null ? <h2>Log in to application</h2> : <h2>blogs</h2>}
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
