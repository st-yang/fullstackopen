import { Pressable, StyleSheet } from 'react-native'

import theme from '../../theme'
import Text from './Text'

const styles = StyleSheet.create({
  button: {
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
})

const Button = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText} fontSize='fontSizeSubheading' fontWeight='bold'>
        {title}
      </Text>
    </Pressable>
  )
}

export default Button
