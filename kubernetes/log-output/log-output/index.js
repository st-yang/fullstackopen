const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(directory, 'current.log')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`read from ${filePath}: ${data}`)
    res.send(data)
  })
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
