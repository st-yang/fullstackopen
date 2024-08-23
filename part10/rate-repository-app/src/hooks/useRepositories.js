import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ orderBy = 'CREATED_AT', orderDirection = 'DESC' }) => {
  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection },
  })

  const repositories = loading ? null : data.repositories

  return { repositories, loading }
}

export default useRepositories
