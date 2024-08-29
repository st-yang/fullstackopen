const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  if (readingList) {
    if (req.decodedToken.id !== readingList.userId) {
      return res.status(401).json({ error: 'user can only mark reading status of the blogs in their own reading list' })
    }
    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
  } else {
    res.status(404).end()
  }
})

module.exports = router
