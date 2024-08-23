import { FlatList, View } from 'react-native'
import { useParams } from 'react-router-native'

import useRepository from '../../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import ReviewItem from '../Review/ReviewItem'
import { ItemSeparator } from '../Common/Separators'

const RepositoryView = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  const reviews = repository && repository.reviews ? repository.reviews.edges.map((edge) => edge.node) : []

  return repository ? (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem showDetail repository={repository} />
          {ItemSeparator()}
        </View>
      )}
    />
  ) : (
    <></>
  )
}

export default RepositoryView
