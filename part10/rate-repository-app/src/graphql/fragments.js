import { gql } from '@apollo/client'

export const REPOSITORY_ABSTRACT = gql`
  fragment RepositoryAbstract on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`
