import * as yup from 'yup'

import { MeDocument, useSignUpMutation } from 'generated/graphql'

import Form from '../Forms/Form'
import { InformationCircleIcon } from '@heroicons/react/solid'
import Input from '../Forms/Input'
import Password from '../Forms/Password'
import SignUpModal from 'components/SignUpModal'
import Transit from 'components/Transit'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateUser({
  setSuccess
}: {
  setSuccess: (arg0: boolean) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [createUser] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required('Required'),
        email: yup.string().email().required('Required'),
        password: yup.string().required('Required'),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
      })
    )
  })

  type Data = {
    email: string
    username: string
    password: string
    passwordConfirmation: string
  }

  async function handleCreateUser(data: Data) {
    const response = await createUser({
      variables: {
        options: {
          email: data.email,
          username: data.username,
          password: data.password
        }
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.register?.user
          }
        })
      }
    })
    if (response.data?.register?.errors) {
      response.data?.register?.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else {
      setSuccess(true)
    }
  }

  return (
    <>
      <Transit onEveryMount className="flex justify-center">
        <Form
          handleSubmit={handleSubmit}
          onSubmit={handleCreateUser}
          className="w-96 place-self-center"
        >
          <h5>Sign Up</h5>
          <a
            onClick={() => setIsOpen(true)}
            className="text-rose-600 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-700"
          >
            <InformationCircleIcon className="text-rose-600 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-700" />
            I am signing up as a charity
          </a>
          <Input
            name="username"
            label="Username"
            register={register}
            errors={errors.username}
          />
          <Input
            name="email"
            label="Email Address"
            register={register}
            errors={errors.email}
          />
          <Password
            name="password"
            label="Password"
            register={register}
            errors={errors.password}
          />
          <Password
            name="passwordConfirmation"
            label="Password Confirmation"
            register={register}
            errors={errors.passwordConfirmation}
          />
          <div />
          <button type="submit">Sign Up</button>
        </Form>
      </Transit>
      <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
