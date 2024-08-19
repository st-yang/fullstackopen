interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Exercise => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))