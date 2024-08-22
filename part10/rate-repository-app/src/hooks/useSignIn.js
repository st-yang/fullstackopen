import { useMutation } from '@apollo/client'

import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN)
  const authStorage = useAuthStorage()

  const signIn = async ({ username, password }) => {
    const data = await mutate({ variables: { username, password } })
    return data
  }

  return [signIn, result]
}

export default useSignIn
