const { v4: uuid } = require('uuid')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

let curStr

const getHashNow = () => {
  const timestamp = new Date().toJSON()
  const randomHash = uuid()

  curStr = `${timestamp}: ${randomHash}`
  console.log(curStr)

  setTimeout(getHashNow, 5000)
}

getHashNow()

app.get('/', (req, res) => {
  res.send(curStr)
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
