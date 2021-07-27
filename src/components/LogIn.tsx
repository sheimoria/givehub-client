import { MeDocument, useLoginMutation } from 'generated/graphql'

import Form from 'components/Forms/Form'
import FormButton from 'components/Forms/FormButton'
import Input from 'components/Forms/Input'
import Link from 'next/link'
import Password from 'components/Forms/Password'
import Transit from 'components/Transit'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function LogIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()
  const [logIn] = useLoginMutation()
  const router = useRouter()

  async function handleLogIn(values: {
    usernameOrEmail: string
    password: string
  }) {
    const response = await logIn({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.login?.user
          }
        })
        cache.evict({ fieldName: 'posts:{}' })
      }
    })
    if (response.data?.login?.errors) {
      response.data?.login?.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next)
      } else {
        router.push('/home')
      }
    }
  }

  return (
    <Transit onEveryMount className="w-full md:w-96">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={handleSubmit(handleLogIn)}
        className="w-full md:w-96"
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
          <a className="text-rose-600 hover:text-rose-700 dark:text-rose-600 dark:hover:text-rose-700">
            Forgot password?
          </a>
        </Link>
        <FormButton label="Log In" isSubmitting={isSubmitting} />
      </Form>
    </Transit>
  )
}
