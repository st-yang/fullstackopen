const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    assert(titles.includes('Go To Statement Considered Harmful'))
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    assert(ids.every(id => id !== undefined))

    const _ids = response.body.map(r => r._id)
    assert(_ids.every(id => id === undefined))
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with status code 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }

      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Canonical string reduction'))
    })

    test('succeeds with missing likes property and defaults to 0', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      }

      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.find(b => b.title === 'First class tests')
      assert(addedBlog.likes === 0)
    })

    test('fails with status code 400 if data invalid', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        author: 'Edsger W. Dijkstra',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if token not provided, invalid, or expired', async () => {
      const newBlog = {
        title: 'No Token Provided',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('update an existing blog', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const updateBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .auth(token, { type: 'bearer' })
        .send(updateBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Canonical string reduction'))
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        title: 'New Blog To Be Deleted',
        author: 'Tester',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }
      const response = await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      await api
        .delete(`/api/blogs/${response.body.id}`)
        .auth(token, { type: 'bearer' })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(newBlog.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if user id is not matched', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .auth(token, { type: 'bearer' })
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert(blogsAtEnd.find(b => b.id === blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('view comments of blog', () => {
    test('comments are returned correctly', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultComments = await api
        .get(`/api/blogs/${blogToView.id}/comments`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultComments.body, blogToView.comments)
    })
  })

  describe('post comments to blog', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newComment = {
        comment: 'New Comment',
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .post(`/api/blogs/${blogToUpdate.id}/comments`)
        .auth(token, { type: 'bearer' })
        .send(newComment)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogUpdated = blogsAtEnd[0]

      assert.strictEqual(blogToUpdate.comments.length + 1, blogUpdated.comments.length)
      assert.strictEqual(blogUpdated.comments.at(-1), 'New Comment')
    })

    test('fails with status code 400 if data invalid', async () => {
      const usersAtStart = await helper.usersInDb()
      const user = usersAtStart[0]
      const userForToken = {
        username: user.username,
        id: user.id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)

      const newComment = {
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .post(`/api/blogs/${blogToUpdate.id}/comments`)
        .auth(token, { type: 'bearer' })
        .send(newComment)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      const blogUpdated = blogsAtEnd[0]

      assert.strictEqual(blogToUpdate.comments.length, blogUpdated.comments.length)
    })

    test('fails with status code 401 if token not provided, invalid, or expired', async () => {
      const newComment = {
        comment: 'New Comment',
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .post(`/api/blogs/${blogToUpdate.id}/comments`)
        .send(newComment)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const blogUpdated = blogsAtEnd[0]

      assert.strictEqual(blogToUpdate.comments.length, blogUpdated.comments.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})