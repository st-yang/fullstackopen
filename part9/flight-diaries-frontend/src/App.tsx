import { useEffect, useState } from 'react'
import { Diary } from './types'
import { getAllDiarys } from './services/diaryService'
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getAllDiarys().then((data) => {
      setDiaries(data)
    })
  }, [])

  const addDiary = (newDiary: Diary) => {
    setDiaries(diaries.concat(newDiary))
  }

  return (
    <div>
      <DiaryForm onSubmit={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App
