const path = require('path')
const fs = require('fs')

const configDir = path.join('/', 'usr', 'src', 'app', 'config')
const infoPath = path.join(configDir, 'information.txt')
const message = process.env.MESSAGE || 'default message'

const logDir = path.join('/', 'usr', 'src', 'app', 'logs')
const timestampPath = path.join(logDir, 'current.log')
const pingpongUrl = process.env.PINGPONG_URL || `http://localhost:3000/pingpong`

const axios = require('axios')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  try {
    const information = fs.readFileSync(infoPath, 'utf8')
    const timestamp = fs.readFileSync(timestampPath, 'utf8')
    const pingpong = await axios.get(pingpongUrl)

    res.send(
      [
        `file content: ${information}`,
        `env variable: MESSAGE=${message}`,
        `${timestamp}`,
        `Ping / Pongs: ${pingpong.data}`,
      ].join('<br>'),
    )
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
