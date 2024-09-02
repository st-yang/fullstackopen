import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Image from './components/Image'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { initializeTodos } from './reducers/todoReducer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeTodos())
  }, [dispatch])

  return (
    <>
      <Image />
      <TodoForm />
      <TodoList />
    </>
  )
}

export default App
