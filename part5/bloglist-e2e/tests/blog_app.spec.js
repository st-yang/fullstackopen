const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a new blog', 'Matti Luukkainen', 'http://www.example.com')
      await expect(page.getByText('a new blog Matti Luukkainen')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'First Blog', 'First Author', 'http://www.firstblog.com')
        await createBlog(page, 'Second Blog', 'Second Author', 'http://www.secondblog.com')
        await createBlog(page, 'Third Blog', 'Third Author', 'http://www.thirdblog.com')

        await page.goto('/')
      })

      test('blog can be liked', async ({ page }) => {
        const blogElement = page.getByText('Second Blog').locator('..')
        await blogElement.getByRole('button', { name: 'view' }).click()

        const detailElement = page.getByText('http://www.secondblog.com').locator('..')
        await detailElement.getByRole('button', { name: 'like' }).click()
        await expect(detailElement.getByText('likes 1')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        await expect(page.getByText('First Blog First Author')).toBeVisible()

        const blogElement = page.getByText('First Blog').locator('..')
        await blogElement.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async (dialog) => {
          expect(dialog.message()).toEqual('Remove blog First Blog by First Author')
          await dialog.accept()
        });
        const detailElement = page.getByText('http://www.firstblog.com').locator('..')
        await detailElement.getByRole('button', { name: 'remove' }).click()

        await page.getByText('blog First Blog by First Author removed').waitFor()
        await expect(page.getByText('First Blog First Author')).not.toBeVisible()
      })
    })
  })
})