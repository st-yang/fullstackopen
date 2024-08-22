import { Image, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
  },
  info: {
    paddingLeft: 16,
    paddingBottom: 16,
    gap: 2,
  },
  language: {
    padding: 5,
    borderRadius: 5,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
  },
  stats: {
    flexGrow: 1,
    alignItems: 'center',
  },
})

const StatsItem = ({ text, number }) => {
  const formatNumber = (value) => {
    let number = parseInt(value)
    let suffixLevel = 0
    while (number > 1000) {
      number = (number / 1000).toFixed(1)
      suffixLevel++
    }

    // if fraction is 0, remove it
    if (number % 1 === 0) {
      number = parseInt(number).toFixed(0)
    }

    const suffixes = ['', 'k', 'm', 'b', 't']
    const suffix = suffixes[suffixLevel]

    return number + suffix
  }

  return (
    <View style={styles.stats}>
      <Text fontWeight={'bold'}>{formatNumber(number)}</Text>
      {/* <Text fontWeight={'bold'}>{number}</Text> */}
      <Text color={'textSecondary'}>{text}</Text>
    </View>
  )
}

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Image style={styles.logo} source={{ uri: `${repository.ownerAvatarUrl}` }} />
        </View>
        <View style={styles.info}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {repository.fullName}
          </Text>
          <Text fontSize={'subheading'} color='textSecondary'>
            {repository.description}
          </Text>
          <View style={styles.row}>
            <Text style={styles.language}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <StatsItem text={'Stars'} number={repository.stargazersCount} />
        <StatsItem text={'Forks'} number={repository.forksCount} />
        <StatsItem text={'Reviews'} number={repository.reviewCount} />
        <StatsItem text={'Rating'} number={repository.ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem
