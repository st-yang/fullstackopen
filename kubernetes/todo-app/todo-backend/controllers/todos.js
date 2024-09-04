const todosRouter = require('express').Router()

const Todo = require('../models/todo')

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.findAll({})
  res.json(todos)
})

todosRouter.post('/', async (req, res) => {
  const todo = await Todo.create(req.body)
  res.status(201).json(todo)
})

const todoFinder = async (req, res, next) => {
  req.todo = await Todo.findByPk(req.params.id)
  next()
}

todosRouter.put('/:id', todoFinder, async (req, res) => {
  if (req.todo) {
    req.todo.done = req.body.done
    await req.todo.save()
    res.json(req.todo)
  } else {
    res.status(404).end()
  }
})

module.exports = todosRouter
