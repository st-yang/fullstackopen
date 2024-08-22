import { FlatList, View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
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
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
