import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = ({ id, first, after }) => {
  const variables = { id, first, after }

  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  const repository = loading ? null : data.repository

  return {
    repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepository
