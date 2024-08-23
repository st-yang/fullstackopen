import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'

import useCreateReview from '../../hooks/useCreateReview'
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

export const CreateReviewContainer = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {
        const errorOwnerName = touched.ownerName && errors.ownerName
        const errorRepositoryName = touched.repositoryName && errors.repositoryName
        const errorRating = touched.rating && errors.rating

        return (
          <View style={styles.container}>
            <TextInput
              error={errorOwnerName}
              placeholder='Repository owner name'
              value={values.ownerName}
              onChangeText={handleChange('ownerName')}
              onBlur={handleBlur('ownerName')}
            />
            {errorOwnerName && (
              <Text color='error' fontSize='subheading'>
                {errors.ownerName}
              </Text>
            )}
            <TextInput
              error={errorRepositoryName}
              placeholder='Repository name'
              value={values.repositoryName}
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
            />
            {errorRepositoryName && (
              <Text color='error' fontSize='subheading'>
                {errors.repositoryName}
              </Text>
            )}
            <TextInput
              error={errorRating}
              placeholder='Rating between 0 and 100'
              value={values.rating}
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
            />
            {errorRating && (
              <Text color='error' fontSize='subheading'>
                {errors.rating}
              </Text>
            )}
            <TextInput
              multiline
              style={{ height: 100 }}
              placeholder='Review'
              value={values.text}
              onChangeText={handleChange('text')}
              onBlur={handleBlur('text')}
            />
            <View style={styles.row}>
              <Button title='Create a review' onPress={handleSubmit} />
            </View>
          </View>
        )
      }}
    </Formik>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  }

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().min(0).max(100).required('Rating is required'),
  })

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const result = await createReview({ ownerName, repositoryName, rating: parseInt(rating), text })
      navigate(`/repositories/${result.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} />
}

export default CreateReview
