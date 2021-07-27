import * as yup from 'yup'

import { ArrowSmRightIcon } from '@heroicons/react/solid'
import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import Form from 'components/Forms/Form'
import FormButton from 'components/Forms/FormButton'
import FriendRequests from 'components/Users/FriendRequests'
import Input from 'components/Forms/Input'
import Link from 'next/link'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import UserTasks from 'components/Users/YourEvents'
import { useForgotPasswordMutation } from 'generated/graphql'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ForgotPassword() {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({ email: yup.string().email().required('Required') })
    )
  })
  async function handleForgotPassword(values: { email: string }) {
    await forgotPassword({ variables: values })
    setComplete(true)
  }

  return (
    <Body
      title="Forgot password"
      aside={
        <>
          <FriendRequests />
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
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
        <Form handleSubmit={handleSubmit} onSubmit={handleForgotPassword}>
          <Input
            name="email"
            label="Registered email address"
            register={register}
            errors={errors.email}
          />
          <FormButton
            label="Send Password Reset Email"
            isSubmitting={isSubmitting}
          />
        </Form>
      )}
    </Body>
  )
}
