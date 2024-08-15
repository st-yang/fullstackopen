import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
    <div style={menuStyle}>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      <span>
        {user.name} logged in <button onClick={() => dispatch(logout())}>logout</button>
      </span>
    </div>
  )
}

export default Menu
