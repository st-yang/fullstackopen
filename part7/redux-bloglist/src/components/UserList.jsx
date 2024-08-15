import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const UserList = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice()
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
