import { Form, Formik } from 'formik'

import Body from 'components/Body'
import InputField from 'components/InputField'
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
            <InputField name="title" label="Title" />
            <InputField
              textarea
              name="text"
              label="Body"
            />
            <button type="submit">Create post</button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(CreatePost)
