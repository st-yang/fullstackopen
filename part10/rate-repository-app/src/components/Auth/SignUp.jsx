import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'

import useSignIn from '../../hooks/useSignIn'
import useSignUp from '../../hooks/useSignUp'
import Button from '../Common/Button'
import Text from '../Common/Text'
import TextInput from '../Common/TextInput'

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
})

export const SignUpContainer = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {
        const errorUsername = touched.username && errors.username
        const errorPassword = touched.password && errors.password
        const errorPasswordConfirm = touched.passwordConfirm && errors.passwordConfirm

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
            <TextInput
              secureTextEntry
              error={errorPasswordConfirm}
              placeholder='Password confirmation'
              value={values.passwordConfirm}
              onChangeText={handleChange('passwordConfirm')}
              onBlur={handleBlur('passwordConfirm')}
            />
            {errorPasswordConfirm && (
              <Text color='error' fontSize='subheading'>
                {errors.passwordConfirm}
              </Text>
            )}
            <View style={styles.row}>
              <Button title='Sign up' onPress={handleSubmit} />
            </View>
          </View>
        )
      }}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  })

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} />
}

export default SignUp
