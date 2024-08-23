import { FlatList } from 'react-native'

import useReviews from '../../hooks/useReviews'
import { ItemSeparator } from '../Common/Separators'
import ReviewItem from './ReviewItem'

const ReviewListContainer = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  )
}

const ReviewList = () => {
  const { reviews } = useReviews()

  return <ReviewListContainer reviews={reviews} />
}

export default ReviewList
