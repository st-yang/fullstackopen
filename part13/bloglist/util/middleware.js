const jwt = require('jsonwebtoken')

const { SECRET } = require('./config.js')
const Session = require('../models/session.js')
const User = require('../models/user.js')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)

    // check if session exists
    const session = await Session.findOne({
      attributes: { exclude: ['userId'] },
      include: { model: User },
      where: { token },
    })
    if (!session) {
      return res.status(401).json({ error: 'token expired' })
    }

    // decode token
    let decodedToken
    try {
      decodedToken = jwt.verify(token, SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }

    // verify token and user status, remove session if invalid
    if (decodedToken.id !== session.user.id) {
      await session.destroy()
      return res.status(401).json({ error: 'token invalid' })
    } else if (session.user.disabled) {
      await session.destroy()
      return res.status(401).json({ error: 'account disabled' })
    }

    // add valid decoded token to request
    req.decodedToken = decodedToken
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }
