import { useSelector } from 'react-redux'

const TodoList = () => {
  const todos = useSelector(({ todos }) => todos)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}

export default TodoList
