import * as yup from 'yup'

import { MeDocument, useSignUpMutation } from 'generated/graphql'
import React, { useState } from 'react'

import Form from '../forms/Form'
import FormButton from 'components/forms/FormButton'
import { InformationCircleIcon } from '@heroicons/react/solid'
import Input from '../forms/Input'
import Password from '../forms/Password'
import SignUpModal from 'components/SignUpModal'
import Transit from 'components/Transit'
import { useForm } from 'react-hook-form'
import useToggle from 'utils/useToggle'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateUser({
  setSuccess
}: {
  setSuccess: (arg0: boolean) => void
}) {
  const [isOpen, toggleIsOpen] = useToggle()
  const [createUser] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required('Required'),
        email: yup.string().email().required('Required'),
        password: yup.string().required('Required')
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
      <Transit
        onEveryMount
        as="section"
        className="w-full px-6 place-self-center sm:w-96 sm:px-0"
      >
        <Form
          handleSubmit={handleSubmit}
          onSubmit={handleCreateUser}
          className="flex flex-col w-full gap-4"
        >
          <h5>Sign Up</h5>
          <Input
            name="username"
            label="Username"
            register={register}
            errors={errors.username}
            className="bg-white dark:bg-gray-800"
          />
          <Input
            name="email"
            label="Email Address"
            register={register}
            errors={errors.email}
            className="bg-white dark:bg-gray-800"
          />
          <Password
            name="password"
            label="Password"
            register={register}
            errors={errors.password}
            className="bg-white dark:bg-gray-800"
          />
          <a
            onClick={toggleIsOpen}
            className="flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer text-rose-600 hover:text-rose-700 dark:hover:text-rose-500"
          >
            <InformationCircleIcon />
            Signing up as a charity?
          </a>
          <FormButton label="Sign Up" isSubmitting={isSubmitting} />
        </Form>
      </Transit>
      <SignUpModal isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
    </>
  )
}
