import { ErrorMessage, Field, Form, Formik } from 'formik'

import Body from 'components/Body'
import { ReactElement } from 'react'
import { useCreatePostMutation } from 'generated/graphql'
import { useIsAuth } from 'utils/useIsAuth'
import { useRouter } from 'next/router'
import { withApollo } from 'utils/withApollo'

function CreatePost({}): ReactElement<{}> {
  const router = useRouter()
  useIsAuth()
  const [createPost] = useCreatePostMutation()

  return (
    <Body>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts:{}' })
            }
          })
          if (!errors) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field name="title" />
            <ErrorMessage name="title" component="p" />
            <label htmlFor="text">Text</label>
            <Field as="textarea" name="text" />
            <ErrorMessage name="text" component="p" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(CreatePost)
