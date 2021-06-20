import { gql, useMutation } from '@apollo/client'

import Body from 'components/Body'
import Form from 'components/Form'
import Link from 'next/link'
import { loginFormSchema } from 'utils/formSchemas'
import { useRouter } from 'next/router'

const LOGIN = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
        categories
      }
    }
  }
`

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`

export default function LogIn() {
  const [login] = useMutation(LOGIN)
  const router = useRouter()
  async function handleSubmit(values) {
    const response = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery({
          query: ME,
          data: {
            __typename: 'Query',
            me: data.login.user
          }
        })
        cache.evict({ fieldName: 'posts:{}' })
      }
    })
    if (response.data.login.errors) {
      setErrors(toErrorMap(response.data.login.errors))
    } else if (response.data?.login.user) {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next)
      } else {
        router.push('/')
      }
    }
  }
  const forgotPasswordLink = (
    <Link href="/forgot-password">
      <a>Forgot password?</a>
    </Link>
  )

  return (
    <Body title="Login">
      <div className="flex justify-center">
        <Form
          onSubmit={handleSubmit}
          schema={loginFormSchema}
          extra={forgotPasswordLink}
        />
      </div>
    </Body>
  )
}
