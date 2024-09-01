const { v4: uuid } = require('uuid')

const getHashNow = () => {
  const timestamp = new Date().toJSON()
  const randomHash = uuid()

  console.log(`${timestamp}: ${randomHash}`)

  setTimeout(getHashNow, 5000)
}

getHashNow()
