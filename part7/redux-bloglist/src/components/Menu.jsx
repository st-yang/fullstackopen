import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar } from '@mui/material'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5,
  }

  const menuStyle = {
    background: 'lightgray',
    padding: 5,
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <span>
          {user.name} logged in{' '}
          <Button color='inherit' onClick={() => dispatch(logout())}>
            logout
          </Button>
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
