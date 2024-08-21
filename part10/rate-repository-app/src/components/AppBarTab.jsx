import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    marginLeft: 16,
  },
})

const AppBarTab = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.tab}>{title}</Text>
    </Pressable>
  )
}

export default AppBarTab
