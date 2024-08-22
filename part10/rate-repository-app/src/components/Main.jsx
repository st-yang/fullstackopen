import { StyleSheet, View } from 'react-native'
import { Navigate, Route, Routes } from 'react-router-native'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import theme from '../theme'
import SignUp from './SignUp'
import SignIn from './SignIn'
import SignOut from './SignOut'
import RepositoryView from './RepositoryList/RepositoryView'
import CreateReview from './CreateReview'

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
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
