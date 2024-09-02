const healthRouter = require('express').Router()

healthRouter.get('/', async (req, res) => {
  res.send('ok')
})

module.exports = healthRouter
