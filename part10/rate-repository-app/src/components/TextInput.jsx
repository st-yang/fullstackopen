import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
})

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.textInput, style]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
