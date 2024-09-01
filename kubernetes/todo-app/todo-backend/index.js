const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/health', (req, res) => {
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
