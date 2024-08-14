import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByTestId('title')
  const author = screen.getByTestId('author')
  const url = screen.getByTestId('url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'test title')
  await user.type(author, 'test author')
  await user.type(url, 'http://test.url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.url')
})
