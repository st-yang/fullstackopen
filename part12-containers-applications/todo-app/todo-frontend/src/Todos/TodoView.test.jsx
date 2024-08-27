import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import TodoList from './List'

test('during build phase', () => {
  const todos = [
    { _id: 'testid1', text: 'this is a test', done: false, __v: 0 },
    { _id: 'testid2', text: 'this is a done test', done: true, __v: 0 },
  ]
  const myMockDelete = vi.fn()
  const myMockComplete = vi.fn()

  render(<TodoList todos={todos} deleteTodo={myMockDelete} completeTodo={myMockComplete} />)

  expect(screen.getByText('this is a test')).toBeDefined()
  expect(screen.getByText('This todo is not done')).toBeDefined()

  expect(screen.getByText('this is a done test')).toBeDefined()
  expect(screen.getByText('This todo is done')).toBeDefined()

  expect(screen.getAllByText('Delete')).toHaveLength(2)
  expect(screen.getAllByText('Set as done')).toHaveLength(1)
})
