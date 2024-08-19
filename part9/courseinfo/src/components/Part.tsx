import { CoursePart } from '../types'
import { assertNever } from '../utils'

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const { part } = props
  const contentBase = (
    <b>
      {part.name} {part.exerciseCount}
    </b>
  )

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <div>{contentBase}</div>
          <div>
            <i>{part.description}</i>
          </div>
          <p />
        </div>
      )
    case 'group':
      return (
        <div>
          <div>{contentBase}</div>
          <div>project exercises {part.groupProjectCount}</div>
          <p />
        </div>
      )
    case 'background':
      return (
        <div>
          <div>{contentBase}</div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>{part.backgroundMaterial}</div>
          <p />
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part
