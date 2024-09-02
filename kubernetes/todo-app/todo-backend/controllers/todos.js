const todosRouter = require('express').Router()

let todos = [
  {
    id: 1,
    text: 'TODO 1',
    done: false,
  },
  {
    id: 2,
    text: 'TODO 2',
    done: false,
  },
]

todosRouter.get('/', async (req, res) => {
  res.send(todos)
})

todosRouter.post('/', async (req, res) => {
  const todo = {
    id: todos.length + 1,
    text: req.body.text,
    done: false,
  }

  todos = todos.concat(todo)
  res.status(201).send(todo)
})

module.exports = todosRouter
