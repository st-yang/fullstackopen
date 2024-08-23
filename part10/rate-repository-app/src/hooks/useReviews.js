import { useQuery } from '@apollo/client'

import { GET_CURRENT_USER } from '../graphql/queries'

const useReviews = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  })

  const reviews = loading ? null : data.me.reviews.edges.map((edge) => edge.node)

  return { reviews, loading }
}

export default useReviews
