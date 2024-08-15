import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
