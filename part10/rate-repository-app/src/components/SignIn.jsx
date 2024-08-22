import { StyleSheet, View } from 'react-native'
import { useFormik } from 'formik'
import Button from './Button'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  signInForm: {
    gap: 20,
    padding: 20,
  },
})

const initialValues = {
  username: '',
  password: '',
}

const onSubmit = (values) => {
  console.log(values)
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <View style={styles.signInForm}>
      <TextInput placeholder='Username' value={formik.values.username} onChange={formik.handleChange('username')} />
      <TextInput
        secureTextEntry
        placeholder='Password'
        value={formik.values.password}
        onChange={formik.handleChange('password')}
      />
      <Button text='Sign In' onPress={formik.handleSubmit} />
    </View>
  )
}

export default SignIn
