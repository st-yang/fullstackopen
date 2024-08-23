import Constants from 'expo-constants'
import { ScrollView, StyleSheet, View } from 'react-native'

import useUser from '../../hooks/useUser'
import theme from '../../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 80,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} url={'/'} />
        {!user && <AppBarTab text={'Sign in'} url={'/signin'} />}
        {!user && <AppBarTab text={'Sign up'} url={'/signup'} />}
        {user && <AppBarTab text={'Create a review'} url={'/createReview'} />}
        {user && <AppBarTab text={'My reviews'} url={'/myReviews'} />}
        {user && <AppBarTab text={'Sign out'} url={'/signout'} />}
      </ScrollView>
    </View>
  )
}

export default AppBar
