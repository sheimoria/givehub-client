import * as yup from 'yup'

import { MeDocument, useChangePasswordMutation } from 'generated/graphql'

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

  async function handleChangePassword(data: { newPassword: string }) {
    const response = await changePassword({
      variables: {
        newPassword: data.newPassword,
        token: typeof router.query.token === 'string' ? router.query.token : ''
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.changePassword.user
          }
        })
      }
    })
    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors)
      if ('token' in errorMap) {
        setTokenError(errorMap.token)
      }
      Object.keys(errorMap).map((field) =>
        setError(field, { type: 'manual', message: errorMap[field] })
      )
    } else if (response.data?.changePassword.user) {
      router.push('/')
    }
  }

  return (
    <Body title="Change password">
      <Form handleSubmit={handleSubmit} onSubmit={handleChangePassword}>
        <Input
          name="newPassword"
          label="New password"
          register={register}
          errors={errors.newPassword}
        />
        {tokenError && (
          <>
            <p className="text-rose-600">{tokenError}</p>
            <Link href="/forgot-password">
              <a>Click here to get a new one</a>
            </Link>
          </>
        )}
      </Form>
    </Body>
  )
}

function toErrorMap(errors: { field: string; message: string }[]) {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })

  return errorMap
}
