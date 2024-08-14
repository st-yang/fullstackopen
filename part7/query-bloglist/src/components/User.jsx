import { useQueryClient } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'
const User = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])
  const match = useMatch('/users/:id')
  const user = match ? users?.find((user) => user.id === match.params.id) : null

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  ) : null
}

export default User
