const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, clickLike } = require('./helper')

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

      test('only the author can see the remove button of blog', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'Observer',
            username: 'observer',
            password: 'salainen'
          }
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'observer', 'salainen')

        await expect(page.getByText('First Blog First Author')).toBeVisible()

        const blogElement = page.getByText('First Blog').locator('..')
        await blogElement.getByRole('button', { name: 'view' }).click()

        const detailElement = page.getByText('http://www.firstblog.com').locator('..')
        expect(detailElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are sorted by likes descendingly', async ({ page }) => {
        // assert blogs are in original order: 1->2->3
        await expect(page.locator('.blog').first().getByText('First Blog First Author')).toBeVisible()
        await expect(page.locator('.blog').nth(1).getByText('Second Blog Second Author')).toBeVisible()
        await expect(page.locator('.blog').last().getByText('Third Blog Third Author')).toBeVisible()

        // add 2 likes to the second blog
        const blogElement2 = page.getByText('Second Blog').locator('..')
        await blogElement2.getByRole('button', { name: 'view' }).click()
        const detailElement2 = page.getByText('http://www.secondblog.com').locator('..')
        await clickLike(page, detailElement2.getByRole('button', { name: 'like' }), 2)

        // add 1 like to the third blog
        const blogElement3 = page.getByText('Third Blog').locator('..')
        await blogElement3.getByRole('button', { name: 'view' }).click()
        const detailElement3 = page.getByText('http://www.thirdblog.com').locator('..')
        await clickLike(page, detailElement3.getByRole('button', { name: 'like' }), 1)

        // assert blogs are sorted in descending order by likes: 2->3->1
        const blogDivs = await page.locator('div.blog').all()
        await expect(blogDivs[0].getByText('Second Blog Second Author')).toBeVisible()
        await expect(blogDivs[1].getByText('Third Blog Third Author')).toBeVisible()
        await expect(blogDivs[2].getByText('First Blog First Author')).toBeVisible()
      })
    })
  })
})