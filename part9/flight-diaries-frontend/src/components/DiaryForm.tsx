import { useState } from 'react'
import { createDiary } from '../services/diaryService'
import { Diary, Visibility, Weather } from '../types'

type DiaryFormProps = {
  onSubmit: (newDiary: Diary) => void
}

const DiaryForm = ({ onSubmit }: DiaryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ date, visibility: visibility as Visibility, weather: weather as Weather, comment }).then((data) => {
      onSubmit(data)
    })
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input name='date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility
          <input name='visibility' value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </div>
        <div>
          weather
          <input name='weather' value={weather} onChange={(event) => setWeather(event.target.value)} />
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
