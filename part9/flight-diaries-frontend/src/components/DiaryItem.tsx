import { Diary } from '../types'

type DiaryItemProps = {
  diary: Diary
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  )
}

export default DiaryItem
