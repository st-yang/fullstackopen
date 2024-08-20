import { useEffect, useState } from 'react'
import { Diary } from './types'
import { getAllDiarys } from './services/diaryService'
import DiaryList from './components/DiaryList'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getAllDiarys().then((data) => {
      setDiaries(data)
    })
  }, [])

  return <DiaryList diaries={diaries} />
}

export default App
