import { AxiosError } from 'axios'

import { useState } from 'react'
import { createDiary } from '../services/diaryService'
import { Diary, Visibility, Weather } from '../types'

type DiaryFormProps = {
  onSubmit: (newDiary: Diary) => void
}

const DiaryForm = ({ onSubmit }: DiaryFormProps) => {
  const [error, setError] = useState('')

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ date, visibility: visibility as Visibility, weather: weather as Weather, comment })
      .then((data) => {
        onSubmit(data)
        setError('')
      })
      .catch((error: AxiosError<string>) => {
        if (error.response) {
          setError(error.response.data)
        }
      })
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input name='date' type='date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility{' '}
          {Object.values(Visibility).map((value) => (
            <span key={value}>
              {value}
              <input
                name='visibility'
                type='radio'
                value={value}
                onChange={(event) => setVisibility(event.target.value)}
              />
            </span>
          ))}
        </div>
        <div>
          weather{' '}
          {Object.values(Weather).map((value) => (
            <span key={value}>
              {value}
              <input name='weather' type='radio' value={value} onChange={(event) => setWeather(event.target.value)} />
            </span>
          ))}
        </div>
        <div>
          comment
          <input name='comment' value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm
