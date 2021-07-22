import * as yup from 'yup'

/* import { MeDocument, useChangePasswordMutation } from 'generated/graphql'

import Body from 'components/layout/Body'
import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ChangePassword() {
  const [tokenError, setTokenError] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        newPassword: yup.string().required('Required')
      })
    )
  })
  const [changePassword] = useChangePasswordMutation()

  async function handleChangePassword(values) {
    const response = await changePassword({
      variables: {
        newPassword: values.newPassword,
        token: typeof router.query.token === 'string' ? router.query.token : ''
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data.changePassword.user
          }
        })
      }
    })
    if (response.data.changePassword.errors) {
      const errors = response.data.changePassword.errors.forEach(
        ({ field, message }) =>
          setError(field, { type: 'manual', message: message })
      )
      if ('token' in errors) {
        setTokenError(errors.token)
      }
      errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else if (response.data.changePassword.user) {
      router.push('/')
    }
  }

  const tokenErrorLink = tokenError && (
    <>
      <p className="text-red-500">{tokenError}</p>
      <Link href="/forgot-password">
        <a>Click here to get a new one</a>
      </Link>
    </>
  )

  return (
    <Body title="Change password">
      <Form handleSubmit={handleSubmit} onSubmit={handleSubmit}>
        <Input
          name="newPassword"
          label="New password"
          register={register}
          errors={errors.newPassword}
        />
      </Form>
    </Body>
  )
} */
