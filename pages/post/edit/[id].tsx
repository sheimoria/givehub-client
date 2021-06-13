import { Form, Formik } from 'formik'
import { usePostQuery, useUpdatePostMutation } from 'generated/graphql'

import Body from 'components/Body'
import InputField from 'components/InputField'
import { useGetIntId } from 'utils/useGetIntId'
import { useRouter } from 'next/router'
import { withApollo } from 'utils/withApollo'

function EditPost() {
  const router = useRouter()
  const intId = useGetIntId()
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId
    }
  })
  const [updatePost] = useUpdatePostMutation()

  return (
    <Body>
      {loading && <h6 className="animate-pulse">Loading</h6>}
      {!data?.post && <h6>Could not find post</h6>}
      {data && (
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            await updatePost({ variables: { id: intId, ...values } })
            router.back()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" label="Title" />
              <InputField textarea name="text" label="Body" />
              <button type="submit">Update post</button>
            </Form>
          )}
        </Formik>
      )}
    </Body>
  )
}

export default withApollo({ ssr: false })(EditPost)
