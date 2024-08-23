import { StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import theme from '../../theme'

const sortBarStyle = {
  height: 50,
  padding: 10,
  fontSize: theme.fontSizes.subheading,
  borderWidth: 0,
  backgroundColor: theme.colors.mainBackground,
}

const styles = StyleSheet.create({
  inputAndroid: sortBarStyle,
  inputIOS: sortBarStyle,
  inputWeb: sortBarStyle,
})

const SortBar = ({ value, onChange }) => {
  return (
    <RNPickerSelect
      style={styles}
      value={value}
      onValueChange={onChange}
      items={[
        { label: 'Latest repositories', value: 'CREATED_AT:DESC' },
        { label: 'Highest rated repositories', value: 'RATING_AVERAGE:DESC' },
        { label: 'Lowest rated repositories', value: 'RATING_AVERAGE:ASC' },
      ]}
    />
  )
}

export default SortBar
