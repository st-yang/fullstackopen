import { StyleSheet, View } from 'react-native'
import { format } from 'date-fns'

import theme from '../theme'
import Text from './Text'
import { VerticalSeparator } from './Separators'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    gap: 5,
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container} testID='reviewItem'>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text fontSize={'subheading'} fontWeight={'bold'} color={'primary'}>
            {review.rating}
          </Text>
        </View>
        {VerticalSeparator()}
        <View style={styles.info}>
          {review.user && (
            <Text fontSize={'subheading'} fontWeight={'bold'}>
              {review.user.username}
            </Text>
          )}
          {review.repository && (
            <Text fontSize={'subheading'} fontWeight={'bold'}>
              {review.repository.fullName}
            </Text>
          )}
          <Text fontSize={'subheading'} color='textSecondary'>
            {format(review.createdAt, 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
