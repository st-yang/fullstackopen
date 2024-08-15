import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'
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
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField data-testid='username' type='text' name='username' label='username' />
        </div>
        <div>
          <TextField data-testid='password' type='password' name='password' label='password' />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
