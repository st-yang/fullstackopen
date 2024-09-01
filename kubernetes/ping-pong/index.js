const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

let count = 0

app.get('/pingpong', (req, res) => {
  res.send(`pong ${count++}`)
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
