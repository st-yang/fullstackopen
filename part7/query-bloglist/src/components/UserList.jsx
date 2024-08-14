import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const UserList = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  return users ? (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .slice()
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : null
}

export default UserList
