const router = require('express').Router()

const { Session, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  // directly extract token as already checked in tokenExtractor
  const token = req.get('authorization').substring(7)

  const session = await Session.findOne({ where: { token } })
  if (!session) {
    return res.status(401).json({ error: 'token expired' })
  }

  await session.destroy()
  res.status(204).end()
})

module.exports = router
