const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('login as root', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret',
    }

    const loginResult = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const user = usersAtEnd.find(u => u.username === loginResult.body.username)
    const userForToken = {
      username: user.username,
      id: user.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    assert.strictEqual(loginResult.body.token, token)
  })

  test('login with invalid credentials', async () => {
    const user = {
      username: 'invalid',
      password: 'invalid',
    }

    await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})