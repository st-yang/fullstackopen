import { useContext } from 'react'
import { createContext, useReducer } from 'react'

import { useNotification } from './NotificationContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return <UserContext.Provider value={[user, userDispatch]}>{props.children}</UserContext.Provider>
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useInitializeUser = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]

  return () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'SET', payload: user })
    }
  }
}

export const useLogin = () => {
  const notification = useNotification()
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]

  return async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'SET', payload: user })
    } catch (exception) {
      notification('wrong username or password', 'error')
    }
  }
}

export const useLogout = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]

  return () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch({ type: 'CLEAR' })
  }
}

export default UserContext
