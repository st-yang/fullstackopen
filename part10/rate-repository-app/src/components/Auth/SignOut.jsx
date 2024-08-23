import { useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import { useApolloClient } from '@apollo/client'

import useAuthStorage from '../../hooks/useAuthStorage'

const SignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
  }

  useEffect(() => {
    signOut()
  }, [])

  return <></>
}

export default SignOut
