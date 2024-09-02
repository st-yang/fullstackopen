import { useDispatch } from 'react-redux'

import { createTodo } from '../reducers/todoReducer'

const TodoForm = () => {
  const dispatch = useDispatch()

  const addTodo = (event) => {
    event.preventDefault()

    const text = event.target.text.value

    dispatch(createTodo({ text }))

    event.target.text.value = ''
  }

  return (
    <form onSubmit={addTodo}>
      <input type='text' name='text' placeholder='Add new todo' />
      <button type='submit'>Create TODO</button>
    </form>
  )
}

export default TodoForm
