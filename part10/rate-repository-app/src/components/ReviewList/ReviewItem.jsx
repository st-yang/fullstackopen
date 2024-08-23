import { format } from 'date-fns'
import { Alert, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'

import useDeleteReview from '../../hooks/useDeleteReview'
import theme from '../../theme'
import Button from '../Common/Button'
import { HorizontalSeparator, VerticalSeparator } from '../Common/Separators'
import Text from '../Common/Text'

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

const ReviewItemActions = ({ review }) => {
  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate()

  const handleDeleteReview = async () => {
    try {
      await deleteReview(review.id)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      {HorizontalSeparator()}
      <View style={[styles.row, { gap: 20 }]}>
        <Button title='View repository' onPress={() => navigate(`/repositories/${review.repository.id}`)} />
        <Button
          color='error'
          title='Delete review'
          onPress={() => {
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: handleDeleteReview },
            ])
          }}
        />
      </View>
    </View>
  )
}

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
      {review.repository && <ReviewItemActions review={review} />}
    </View>
  )
}

export default ReviewItem
