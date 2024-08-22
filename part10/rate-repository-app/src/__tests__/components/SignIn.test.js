import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import * as yup from 'yup'

import { SignInContainer } from '../../components/SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const initialValues = {
        username: '',
        password: '',
      }

      const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
      })

      const onSubmit = jest.fn()

      render(<SignInContainer initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      fireEvent.press(screen.getByText('Sign In'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls).toHaveLength(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })

    it('calls onSubmit function with empty arguments', async () => {
      const initialValues = {
        username: '',
        password: '',
      }

      const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
      })

      const onSubmit = jest.fn()

      render(<SignInContainer initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} />)

      fireEvent.press(screen.getByText('Sign In'))
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeDefined()
        expect(screen.getByText('Password is required')).toBeDefined()
        expect(onSubmit).toHaveBeenCalledTimes(0)
        expect(onSubmit.mock.calls).toHaveLength(0)
      })
    })
  })
})
