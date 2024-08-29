const { ReadingList } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

module.exports = router
