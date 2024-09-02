const express = require('express')
require('express-async-errors')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const healthRouter = require('./controllers/health')
const imageRouter = require('./controllers/image')
const todosRouter = require('./controllers/todos')

app.use('/api/health', healthRouter)
app.use('/api/image', imageRouter)
app.use('/api/todos', todosRouter)

module.exports = app
