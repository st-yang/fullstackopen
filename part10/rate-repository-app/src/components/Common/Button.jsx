import { Pressable, StyleSheet } from 'react-native'

import theme from '../../theme'
import Text from './Text'

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    padding: 10,
    borderRadius: 5,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
  },
  colorError: {
    backgroundColor: theme.colors.error,
  },
})

const Button = ({ title, onPress, color, style, ...props }) => {
  const buttonStyle = [styles.button, color === 'error' && styles.colorError, style]

  return (
    <Pressable style={buttonStyle} onPress={onPress} {...props}>
      <Text style={styles.buttonText} fontSize='fontSizeSubheading' fontWeight='bold'>
        {title}
      </Text>
    </Pressable>
  )
}

export default Button
