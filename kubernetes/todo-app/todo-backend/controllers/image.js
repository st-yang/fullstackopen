const imageRouter = require('express').Router()

const axios = require('axios')
const path = require('path')
const fs = require('fs')
const logger = require('../utils/logger')

const directory = path.join('/', 'usr', 'src', 'app', 'storage')
const imagePath = path.join(directory, 'image.jpg')
const expirePath = path.join(directory, 'image.expire')

imageRouter.get('/', async (req, res) => {
  const respondImage = (res, imagePath) => {
    const image = fs.readFileSync(imagePath)
    res.set('Content-Type', 'image/jpeg')
    res.send(image)
  }

  const expireExist = fs.existsSync(expirePath)
  let expired = true
  if (expireExist) {
    const expireTime = fs.readFileSync(expirePath, 'utf8')
    expired = new Date(expireTime) < new Date()
  }

  if (!expireExist || expired) {
    try {
      const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
      response.data.pipe(fs.createWriteStream(imagePath))
      response.data.on('end', () => {
        // cache image for 1 hour
        const expireTime = new Date()
        expireTime.setHours(expireTime.getHours() + 1)
        fs.writeFileSync(expirePath, expireTime.toISOString())
        respondImage(res, imagePath)
      })
    } catch (err) {
      logger.error(err)
    }
  } else {
    respondImage(res, imagePath)
  }
})

module.exports = imageRouter
