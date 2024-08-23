import { useQuery } from '@apollo/client'

import { GET_CURRENT_USER } from '../graphql/queries'

const useUser = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: false },
  })

  const user = loading ? null : data.me

  return { user, loading }
}

export default useUser
