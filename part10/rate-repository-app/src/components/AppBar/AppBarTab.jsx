import { StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import theme from '../../theme'
import Text from '../Text'

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    marginLeft: 16,
  },
})

const AppBarTab = ({ text, url }) => {
  return (
    <Link to={url}>
      <Text style={styles.tab}>{text}</Text>
    </Link>
  )
}

export default AppBarTab
