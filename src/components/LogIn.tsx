import { MeDocument, useLoginMutation } from 'generated/graphql'

import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import Link from 'next/link'
import Password from 'components/forms/Password'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function LogIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  const [logIn] = useLoginMutation()
  const router = useRouter()

  async function handleLogIn(values) {
    const response = await logIn({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data.login.user
          }
        })
        cache.evict({ fieldName: 'posts:{}' })
      }
    })
    if (response.data.login.errors) {
      response.data.login.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else if (response.data.login.user) {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next)
      } else {
        router.push('/home')
      }
    }
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={handleSubmit(handleLogIn)}
      className="w-1/3 "
    >
      <h4>Log in</h4>
      <Input
        name="usernameOrEmail"
        label="Email or Username"
        register={register}
        errors={errors.usernameOrEmail}
      />
      <Password
        name="password"
        label="Password"
        register={register}
        errors={errors.password}
      />
      <Link href="/forgot-password">
        <a>Forgot password?</a>
      </Link>
      <button type="submit">Log in</button>
    </Form>
  )
}
