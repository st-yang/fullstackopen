const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const timestampPath = path.join(directory, 'current.log')
const pingpongPath = path.join(directory, 'pingpong')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  try {
    const timestamp = fs.readFileSync(timestampPath, 'utf8')
    const pingpong = fs.readFileSync(pingpongPath, 'utf8')
    res.send(`${timestamp}\nPing / Pongs: ${pingpong}`)
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
