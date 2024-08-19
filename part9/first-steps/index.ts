import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = req.query.height
  const weight = req.query.weight
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }
  return res.json({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) })
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' })
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }
  const result = calculateExercises(daily_exercises as number[], Number(target))
  return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
