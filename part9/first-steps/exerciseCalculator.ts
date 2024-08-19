interface ExerciseValues {
  dailyHours: number[]
  target: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (isNaN(Number(args[2]))) {
    throw new Error('Target were not number!')
  }
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Daily Hours values were not numbers!')
    }
  }
  return {
    dailyHours: args.slice(3).map((h) => Number(h)),
    target: Number(args[2]),
  }
}

interface Exercise {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (dailyHours: number[], target: number): Exercise => {
  const periodLength = dailyHours.length
  let trainingDays = 0
  let totalHours = 0
  for (let i = 0; i < dailyHours.length; i++) {
    if (dailyHours[i] > 0) {
      trainingDays++
    }
    totalHours += dailyHours[i]
  }
  const success = totalHours >= target * periodLength
  const average = totalHours / periodLength

  let rating = 0
  let ratingDescription = ''
  if (success) {
    rating = 3
    ratingDescription = 'Great job!'
  } else if (average >= target * 0.75) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'You could do better'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { dailyHours, target } = parseArguments(process.argv)
  console.log(calculateExercises(dailyHours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
