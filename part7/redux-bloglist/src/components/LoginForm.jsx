import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(login({ username, password }))

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input data-testid='username' type='text' name='username' />
      </div>
      <div>
        password
        <input data-testid='password' type='password' name='password' />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
