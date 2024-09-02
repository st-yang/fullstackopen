const express = require('express')
require('express-async-errors')
const app = express()

const healthRouter = require('./controllers/health')
const imageRouter = require('./controllers/image')

app.use(express.json())

app.use('/api/health', healthRouter)
app.use('/api/image', imageRouter)

module.exports = app
