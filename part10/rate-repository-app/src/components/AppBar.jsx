import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 80,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={'Repositories'} url={'/'} />
      <AppBarTab text={'Sign In'} url={'/signin'} />
    </View>
  )
}

export default AppBar
