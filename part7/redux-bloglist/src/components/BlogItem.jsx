import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogItem
