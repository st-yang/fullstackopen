const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const clickLike = async (page, button, n = 1) => {
  for (let i = 0; i < n; i++) {
    await button.click()
    await page.getByText(`likes ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, clickLike }