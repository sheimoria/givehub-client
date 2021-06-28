import { gql, useMutation } from '@apollo/client'

import { ArrowSmRightIcon } from '@heroicons/react/solid'
import BodyLite from 'components/layout/BodyLite'
import Form from 'components/forms/Form'
import Link from 'next/link'
import { forgotPasswordSchema } from 'utils/formSchemas'
import { useState } from 'react'

export default function ForgotPassword() {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useMutation(gql`
    mutation ForgotPassword($email: String!) {
      forgotPassword(email: $email)
    }
  `)
  async function handleSubmit(values) {
    await forgotPassword({ variables: values })
    setComplete(true)
  }

  return (
    <BodyLite title="Forgot password">
      {complete ? (
        <>
          <p>
            If an account with that email exists, we have sent you password
            reset instructions.
          </p>
          <Link href="/">
            <a>
              Back to homepage
              <ArrowSmRightIcon className="w-5 h-5" />
            </a>
          </Link>
        </>
      ) : (
        <Form onSubmit={handleSubmit} schema={forgotPasswordSchema} />
      )}
    </BodyLite>
  )
}
