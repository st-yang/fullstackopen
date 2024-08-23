import { StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import Button from '../Common/Button'
import TextInput from '../Common/TextInput'
import Text from '../Common/Text'
import useSignIn from '../../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
})

export const SignInContainer = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {
        const errorUsername = touched.username && errors.username
        const errorPassword = touched.password && errors.password

        return (
          <View style={styles.container}>
            <TextInput
              error={errorUsername}
              placeholder='Username'
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {errorUsername && (
              <Text color='error' fontSize='subheading'>
                {errors.username}
              </Text>
            )}
            <TextInput
              secureTextEntry
              error={errorPassword}
              placeholder='Password'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {errorPassword && (
              <Text color='error' fontSize='subheading'>
                {errors.password}
              </Text>
            )}
            <Button title='Sign In' onPress={handleSubmit} />
          </View>
        )
      }}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} />
}

export default SignIn
