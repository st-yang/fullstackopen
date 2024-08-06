import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
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

test('renders url and likes after clicking view button', async () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')
  expect(url).toBeDefined()

  const likes = screen.getByText('likes 10')
  expect(likes).toBeDefined()
})
