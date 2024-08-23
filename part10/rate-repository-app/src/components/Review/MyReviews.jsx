import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native'

import { GET_CURRENT_USER } from '../../graphql/queries'
import { ItemSeparator } from '../Common/Separators'
import ReviewItem from './ReviewItem'

const MyReviews = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  })
  const user = data && data.me
  const reviews = user && user.reviews ? user.reviews.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews
