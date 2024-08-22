import { useParams } from 'react-router-native'

import useRepository from '../../hooks/useRepository'
import RepositoryItem from './RepositoryItem'

const RepositoryView = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)
  return repository ? <RepositoryItem showDetail repository={repository} /> : <></>
}

export default RepositoryView
