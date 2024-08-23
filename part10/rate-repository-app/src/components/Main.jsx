import { StyleSheet, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'

import theme from '../theme'
import AppBar from './AppBar'
import SignIn from './Auth/SignIn'
import SignOut from './Auth/SignOut'
import SignUp from './Auth/SignUp'
import RepositoryList from './RepositoryList'
import RepositoryView from './RepositoryList/RepositoryView'
import CreateReview from './Review/CreateReview'
import MyReviews from './Review/MyReviews'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/repositories/:id' element={<RepositoryView />} />
        <Route path='/createReview' element={<CreateReview />} />
        <Route path='/myReviews' element={<MyReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
