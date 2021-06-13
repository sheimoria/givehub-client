import { ReactElement } from 'react'
import { Formik, Form } from 'formik'
import InputField from 'components/InputField'
import { useLoginMutation, MeQuery, MeDocument } from 'generated/graphql'
import { toErrorMap } from 'utils/toErrorMap'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { withApollo } from 'utils/withApollo'
import Body from 'components/Body'

function Login(): ReactElement<{}> {
  const router = useRouter()
  const [login] = useLoginMutation()

  return (
    <Body>
      <h3>Login</h3>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user
                }
              })
              cache.evict({ fieldName: 'posts:{}' })
            }
          })
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="usernameOrEmail" label="Username or Email" />
            <InputField name="password" label="Password" type="password" />
            <Link href="/forgot-password">
              <a>Forgot password?</a>
            </Link>
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(Login)
