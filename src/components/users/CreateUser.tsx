import * as yup from 'yup'

import { Genders, MeDocument, useSignUpMutation } from 'generated/graphql'
import React, { useState } from 'react'

import Checkbox from '../forms/Checkbox'
import Form from '../forms/Form'
import { InformationCircleIcon } from '@heroicons/react/solid'
import Input from '../forms/Input'
import Password from '../forms/Password'
import SignUpModal from 'components/SignUpModal'
import Textarea from '../forms/Textarea'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [signUp] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        username: yup.string().required('Required'),
        email: yup.string().email().required('Required'),
        password: yup.string().required('Required'),
        about: yup.string().required('Required')
      })
    )
  })
  const router = useRouter()

  type FormValues = {
    username: string
    email: string
    password: string
    gender: Genders
    firstName: string
    lastName: string
    about: string
    categories: number[]
  }

  async function handleCreateUser(values: FormValues) {
    interface Checkbox extends Element {
      checked: boolean
      name: string
    }
    const interests = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox: Checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox: Checkbox) => parseInt(checkbox.name))

    const response = await signUp({
      variables: {
        signUp: {
          username: values.username,
          email: values.email,
          password: values.password
        },
        userProfile: {
          email: values.email,
          gender: Genders.Withheld,
          firstName: values.firstName,
          lastName: values.lastName,
          about: values.about,
          categories: interests
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
    } else if (response.data?.updateUserProfile?.errors) {
      response.data?.updateUserProfile?.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else {
      router.push('/home')
    }
  }

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={handleCreateUser}
        className="w-1/2 place-self-center"
      >
        <h5>Sign Up</h5>
        <a onClick={() => setIsOpen(true)}>
          <InformationCircleIcon />I am signing up as a charity
        </a>
        <div className="flex flex-wrap gap-6">
          <Input
            name="firstName"
            label="First Name"
            register={register}
            errors={errors.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            register={register}
            errors={errors.lastName}
          />
        </div>
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
        <Textarea
          name="about"
          label="About"
          register={register}
          errors={errors.about}
          placeholder="Tell us a little bit about yourself."
        />
        <h6>Which categories are you interested in?</h6>
        <div className="flex flex-wrap justify-between gap-6">
          {categories.map((column) => (
            <div key={column[0].label} className="flex flex-col gap-4">
              {column.map((category) => (
                <Checkbox
                  key={category.name}
                  name={category.name}
                  label={category.label}
                  register={register}
                  errors={errors[category.name]}
                />
              ))}
            </div>
          ))}
        </div>
        <div />
        <button type="submit">Sign Up</button>
      </Form>
      <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

const categories = [
  [
    { label: 'Animal Welfare', name: '1' },
    { label: 'Arts and Heritage', name: '2' },
    { label: 'Children and Youth', name: '3' },
    { label: 'Community', name: '4' },
    { label: 'Disability', name: '5' }
  ],
  [
    { label: 'Education', name: '6' },
    { label: 'Elderly', name: '7' },
    { label: 'Environment', name: '8' },
    { label: 'Families', name: '9' },
    { label: 'Health', name: '10' }
  ],
  [
    { label: 'Humanitarian', name: '11' },
    { label: 'Social Service', name: '12' },
    { label: 'Sports', name: '13' },
    { label: 'Women and Girls', name: '14' }
  ]
]
