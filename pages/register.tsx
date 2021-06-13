import { ReactElement } from 'react'
import { Formik, Form } from 'formik'
import InputField from 'components/InputField'
import { useRegisterMutation, MeQuery, MeDocument } from 'generated/graphql'
import { toErrorMap } from 'utils/toErrorMap'
import { useRouter } from 'next/router'
import { withApollo } from '../utils/withApollo'
import Body from 'components/Body'

interface registerProps {}

function Register({}): ReactElement<registerProps> {
  const router = useRouter()
  const [register] = useRegisterMutation()

  return (
    <Body>
      <h3>Forgot password</h3>
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
            <InputField name="username" label="Username" />

            <InputField name="email" label="Email" />

            <InputField name="password" label="Password" type="password" />

            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(Register)
