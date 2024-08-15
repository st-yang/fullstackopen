import { Link } from 'react-router-dom'
import { useLogout } from '../context/UserContext'
import { useUserValue } from '../context/UserContext'

const Menu = () => {
  const user = useUserValue()
  const logout = useLogout()

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
        {user.name} logged in <button onClick={logout}>logout</button>
      </span>
    </div>
  )
}

export default Menu
