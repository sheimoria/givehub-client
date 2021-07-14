import { MeDocument, useLoginMutation } from 'generated/graphql'

import { ExclamationCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function LogInForm() {
  const [logIn] = useLoginMutation()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({})
  async function onSubmit(values) {
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
        router.push('/')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-80">
      <h4>Log in</h4>
      <div className="flex flex-col gap-2">
        <label htmlFor="usernameOrEmail">Email or username</label>
        <input {...register('usernameOrEmail')} />
        {errors.usernameOrEmail && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.usernameOrEmail.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.password && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.password.message}
          </span>
        )}
      </div>
      <Link href="/forgot-password">
        <a>Forgot password?</a>
      </Link>
      <button type="submit">Log in</button>
    </form>
  )
}
