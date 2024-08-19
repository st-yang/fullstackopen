import express from 'express'
import cors from 'cors'

const app = express()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.get('/api/patients', (_req, res) => {
  res.status(200).send()
})

app.post('/api/patients', (_req, res) => {
  res.status(201).send()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
