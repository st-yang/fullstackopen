import { CourseEntry } from '../types'

interface ContentProps {
  courseParts: CourseEntry[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
