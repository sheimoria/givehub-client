import { MeDocument, useLoginMutation } from 'generated/graphql'

import Form from './forms/Form'
import FormButton from 'components/forms/FormButton'
import Input from 'components/forms/Input'
import Link from 'next/link'
import Password from 'components/forms/Password'
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
    <Transit onEveryMount as="section" className="w-full sm:w-96">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={handleSubmit(handleLogIn)}
        className="flex flex-col w-full gap-4"
      >
        <h4>Log in</h4>
        <Input
          name="usernameOrEmail"
          label="Email or Username"
          register={register}
          errors={errors.usernameOrEmail}
          className="bg-white dark:bg-gray-800"
        />
        <Password
          name="password"
          label="Password"
          register={register}
          errors={errors.password}
          className="bg-white dark:bg-gray-800"
        />
        <div className="flex justify-end">
          <Link href="/forgot-password">
            <a className="text-xs transition-colors text-rose-600 hover:text-rose-700 dark:hover:text-rose-500">
              Forgot password?
            </a>
          </Link>
        </div>
        <FormButton label="Log In" isSubmitting={isSubmitting} />
      </Form>
      <h6>
        Don&apos;t have an account?{' '}
        <Link href="/sign-up">
          <a className="transition-colors text-rose-600 hover:text-rose-700 dark:text-rose-500">
            Sign up here
          </a>
        </Link>
      </h6>
    </Transit>
  )
}
