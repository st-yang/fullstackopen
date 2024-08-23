import { useApolloClient, useMutation } from '@apollo/client'

import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)
  const apolloClient = useApolloClient()

  const deleteReview = async (id) => {
    const { data } = await mutate({ variables: { id } })
    apolloClient.resetStore()
    return data
  }

  return [deleteReview, result]
}

export default useDeleteReview
