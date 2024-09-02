import { createSlice } from '@reduxjs/toolkit'

import todoService from '../services/todos'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos(state, action) {
      return action.payload
    },
    appendTodo(state, action) {
      state.push(action.payload)
    },
  },
})

const { setTodos, appendTodo } = todoSlice.actions

export const initializeTodos = () => {
  return async (dispatch) => {
    const todos = await todoService.getAll()
    dispatch(setTodos(todos))
  }
}

export const createTodo = (todo) => {
  return async (dispatch) => {
    const newTodo = await todoService.create(todo)
    dispatch(appendTodo(newTodo))
  }
}

export default todoSlice.reducer
