import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('First class tests Robert C. Martin')
  expect(title).toBeDefined()
})
