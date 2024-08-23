import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { Link } from 'react-router-native'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { ItemSeparator } from '../Separators'
import SortBar from './SortBar'

export const RepositoryListContainer = ({ repositories, orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

  const sortValue = `${orderBy}:${orderDirection}`
  const sortOnChange = (value) => {
    const values = value.split(':')
    setOrderBy(values[0])
    setOrderDirection(values[1])
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.id}`}>
          <RepositoryItem repository={item} />
        </Link>
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <SortBar value={sortValue} onChange={sortOnChange} />
        </View>
      )}
    />
  )
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const { repositories } = useRepositories({ orderBy, orderDirection })

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  )
}

export default RepositoryList
