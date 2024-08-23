import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'

import AppBarTab from './AppBarTab'
import theme from '../../theme'
import { GET_CURRENT_USER } from '../../graphql/queries'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 80,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  const user = data && data.me

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
