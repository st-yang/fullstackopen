import { gql } from '@apollo/client'
import { REPOSITORY_ABSTRACT } from './fragments'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        node {
          ...RepositoryAbstract
        }
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
            id
            text
            rating
            createdAt
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
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
