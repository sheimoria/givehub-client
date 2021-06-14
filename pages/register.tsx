import { ErrorMessage, Field, Form, Formik } from 'formik'
import { MeDocument, MeQuery, useRegisterMutation } from 'generated/graphql'

import Body from 'components/Body'
import { ReactElement } from 'react'
import { toErrorMap } from 'utils/toErrorMap'
import { useRouter } from 'next/router'
import { withApollo } from 'utils/withApollo'

interface registerProps {}

function Register({}): ReactElement<registerProps> {
  const router = useRouter()
  const [register] = useRegisterMutation()

  return (
    <Body>
      <h3>Register</h3>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user
                }
              })
            }
          })
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="p" />
            <label htmlFor="email">Email</label>
            <Field name="email" />
            <ErrorMessage name="email" component="p" />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="p" />
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(Register)
