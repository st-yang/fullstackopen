import { FlatList, View } from 'react-native'
import { useParams } from 'react-router-native'

import useRepository from '../../hooks/useRepository'
import { ItemSeparator } from '../Common/Separators'
import ReviewItem from '../Review/ReviewItem'
import RepositoryItem from './RepositoryItem'

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
