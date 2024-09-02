const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const timestampPath = path.join(directory, 'current.log')
const pingpongUrl = process.env.PINGPONG_URL || `http://localhost:3000/pingpong`

const axios = require('axios')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  try {
    const timestamp = fs.readFileSync(timestampPath, 'utf8')
    const pingpong = await axios.get(pingpongUrl)
    res.send(`${timestamp}\nPing / Pongs: ${pingpong.data}`)
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
