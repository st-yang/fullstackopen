import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'

import AppBarTab from './AppBarTab'
import theme from '../../theme'
import { ME } from '../../graphql/queries'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 80,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const { data } = useQuery(ME)
  const user = data && data.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} url={'/'} />
        {!user && <AppBarTab text={'Sign In'} url={'/signin'} />}
        {user && <AppBarTab text={'Sign Out'} url={'/signout'} />}
      </ScrollView>
    </View>
  )
}

export default AppBar
