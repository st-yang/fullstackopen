const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(directory, 'current.log')

const { v4: uuid } = require('uuid')

const generateHashNow = () => {
  const timestamp = new Date().toJSON()
  const randomHash = uuid()

  const content = `${timestamp}: ${randomHash}`

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`write to ${filePath}: ${content}`)
  })

  setTimeout(generateHashNow, 5000)
}

generateHashNow()
