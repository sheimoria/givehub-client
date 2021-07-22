import * as yup from 'yup'
import { useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import Body from 'components/layout/Body'
import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import Link from 'next/link'
import { useForgotPasswordMutation } from 'generated/graphql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'
import PeopleToFollow from 'components/users/PeopleToFollow'
import CharitiesToFollow from 'components/users/CharitiesToFollow'

export default function ForgotPassword() {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors }
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
          <button type="submit">Send password reset email</button>
        </Form>
      )}
    </Body>
  )
}
