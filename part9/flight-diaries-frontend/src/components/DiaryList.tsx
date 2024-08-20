import { Diary } from '../types'
import DiaryItem from './DiaryItem'

type DiaryListProps = {
  diaries: Diary[]
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

export default DiaryList
