import { StyleSheet, View } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from './Button'
import TextInput from './TextInput'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const onSubmit = (values) => {
  console.log(values)
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const errorUsername = formik.touched.username && formik.errors.username
  const errorPassword = formik.touched.password && formik.errors.password

  return (
    <View style={styles.container}>
      <TextInput
        error={errorUsername}
        placeholder='Username'
        value={formik.values.username}
        onChange={formik.handleChange('username')}
      />
      {errorUsername && (
        <Text color='error' fontSize='subheading'>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        secureTextEntry
        error={errorPassword}
        placeholder='Password'
        value={formik.values.password}
        onChange={formik.handleChange('password')}
      />
      {errorPassword && (
        <Text color='error' fontSize='subheading'>
          {formik.errors.password}
        </Text>
      )}
      <Button text='Sign In' onPress={formik.handleSubmit} />
    </View>
  )
}

export default SignIn
