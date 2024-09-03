const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { Counter } = require('./models')

app.get('/', (req, res) => res.send('ok'))

app.get('/pingpong', async (req, res) => {
  const count = await Counter.findOne()
  count.count++
  await count.save()
  res.send(`${count.count}`)
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
