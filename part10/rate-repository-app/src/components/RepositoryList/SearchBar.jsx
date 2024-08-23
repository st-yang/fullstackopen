import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'

import theme from '../../theme'

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  input: {
    fontSize: theme.fontSizes.subheading,
  },
})

const SearchBar = ({ value, onChange }) => {
  return (
    <Searchbar
      style={styles.searchBar}
      inputStyle={styles.input}
      placeholder='Search'
      value={value}
      onChangeText={onChange}
    />
  )
}

export default SearchBar
