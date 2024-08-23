import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { Link } from 'react-router-native'
import { useDebounce } from 'use-debounce'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { ItemSeparator } from '../Common/Separators'
import SortBar from './SortBar'
import SearchBar from './SearchBar'

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { orderBy, setOrderBy, orderDirection, setOrderDirection, searchKeyword, setSearchKeyword } = this.props

    const sortValue = `${orderBy}:${orderDirection}`
    const sortOnChange = (value) => {
      const values = value.split(':')
      setOrderBy(values[0])
      setOrderDirection(values[1])
    }

    const searchOnChange = (value) => setSearchKeyword(value)

    return (
      <View>
        <SearchBar value={searchKeyword} onChange={searchOnChange} />
        <SortBar value={sortValue} onChange={sortOnChange} />
      </View>
    )
  }

  render() {
    const { repositories } = this.props
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []
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
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchDebounce] = useDebounce(searchKeyword, 500)
  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword: searchDebounce })

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  )
}

export default RepositoryList
