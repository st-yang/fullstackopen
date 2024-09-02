const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(directory, 'pingpong')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

let count = 0

app.get('/pingpong', (req, res) => {
  count++
  res.send(`${count}`)
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
