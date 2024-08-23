import { StyleSheet, View } from 'react-native'

import Text from '../Common/Text'

const styles = StyleSheet.create({
  stats: {
    flexGrow: 1,
    justifyContent: 'center',
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
      <Text color={'textSecondary'}>{text}</Text>
    </View>
  )
}

export default StatsItem
