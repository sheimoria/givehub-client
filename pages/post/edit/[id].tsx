import { Form, Formik, Field, ErrorMessage } from 'formik'
import { usePostQuery, useUpdatePostMutation } from 'generated/graphql'

import Body from 'components/Body'
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
              <label htmlFor="title">Title</label>
              <Field name="title" />
              <ErrorMessage name="title" component="p" />
              <label htmlFor="text">Text</label>
              <Field as="textarea" name="text" />
              <ErrorMessage name="text" component="p" />
              <button type="submit">Update post</button>
            </Form>
          )}
        </Formik>
      )}
    </Body>
  )
}

export default withApollo({ ssr: false })(EditPost)
