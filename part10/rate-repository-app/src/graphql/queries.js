import { gql } from '@apollo/client'
import { REPOSITORY_ABSTRACT, REVIEW_ABSTRACT } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryAbstract
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_ABSTRACT}
`

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryAbstract
      url
      reviews {
        edges {
          node {
            ...ReviewAbstract
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_ABSTRACT}
  ${REVIEW_ABSTRACT}
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewAbstract
            repository {
              id
              fullName
              name
              ownerName
            }
          }
        }
      }
    }
  }
  ${REVIEW_ABSTRACT}
`
