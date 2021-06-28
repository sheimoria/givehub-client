import Body from 'components/layout/Body'
import Form from 'components/forms/Form'
import { changePasswordSchema } from 'utils/formSchemas'
import { gql } from '@apollo/client'
import useChangePasswordMutation from 'hooks/useChangePasswordMutation'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ChangePassword() {
  const [tokenError, setTokenError] = useState('')
  const router = useRouter()
  const { setError } = useForm()
  const [changePassword] = useChangePasswordMutation()

  async function handleSubmit(values) {
    const response = await changePassword({
      variables: {
        newPassword: values.newPassword,
        token: typeof router.query.token === 'string' ? router.query.token : ''
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: ME,
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
    <Body>
      <Form
        schema={changePasswordSchema}
        onSubmit={handleSubmit}
        extra={tokenErrorLink}
      />
    </Body>
  )
}

const ME = gql`
  query Me {
    me {
      id
    }
  }
`
