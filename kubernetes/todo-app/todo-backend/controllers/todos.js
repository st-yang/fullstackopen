const todosRouter = require('express').Router()

todosRouter.get('/', async (req, res) => {
  const todos = [
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
  res.send(todos)
})

module.exports = todosRouter
