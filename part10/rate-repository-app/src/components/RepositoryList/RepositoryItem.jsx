import { Image, Linking, StyleSheet, View } from 'react-native'

import theme from '../../theme'
import Button from '../Common/Button'
import { HorizontalSeparator, VerticalSeparator } from '../Common/Separators'
import Text from '../Common/Text'
import StatsItem from './StatsItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  logo: {
    borderRadius: 5,
    width: 50,
    height: 50,
  },
  info: {
    gap: 5,
  },
  language: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  languageText: {
    color: theme.colors.white,
  },
})

const RepositoryItem = ({ repository, showDetail = false }) => {
  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.row}>
        <View>
          <Image style={styles.logo} source={{ uri: `${repository.ownerAvatarUrl}` }} />
        </View>
        {VerticalSeparator()}
        <View style={styles.info}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {repository.fullName}
          </Text>
          <Text fontSize={'subheading'} color='textSecondary'>
            {repository.description}
          </Text>
          <View style={[styles.row]}>
            <View style={styles.language}>
              <Text style={styles.languageText}>{repository.language}</Text>
            </View>
          </View>
        </View>
      </View>
      {HorizontalSeparator()}
      <View style={styles.row}>
        <StatsItem text={'Stars'} number={repository.stargazersCount} />
        <StatsItem text={'Forks'} number={repository.forksCount} />
        <StatsItem text={'Reviews'} number={repository.reviewCount} />
        <StatsItem text={'Rating'} number={repository.ratingAverage} />
      </View>
      {showDetail && (
        <View>
          {HorizontalSeparator()}
          <Button title='Open in GitHub' onPress={() => Linking.openURL(repository.url)} />
        </View>
      )}
    </View>
  )
}

export default RepositoryItem
