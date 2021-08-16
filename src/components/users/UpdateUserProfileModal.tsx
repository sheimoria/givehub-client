import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {
  Genders,
  UserProfileFragment,
  UserProfileUpdateInput
} from 'generated/graphql'

import Checkbox from 'components/forms/Checkbox'
import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import Textarea from 'components/forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { XIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useUpdateUserProfileMutation } from 'generated/graphql'
import { yupResolver } from '@hookform/resolvers/yup'
import { RefreshIcon } from '@heroicons/react/outline'

type Props = {
  toggleIsOpen: () => void
  user: UserProfileFragment
}

export default function UpdateUserProfileModal({ toggleIsOpen, user }: Props) {
  const defaultCategories = Object.fromEntries(
    user.categories.map((category) => [category.id, 'checked'])
  )
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
      about: user.profile?.about,
      ...defaultCategories
    },
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        about: yup.string().required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const [updateUserProfile] = useUpdateUserProfileMutation()

  async function handleUpdateUserProfile(data: UserProfileUpdateInput) {
    const interests = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox: Checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox: Checkbox) => parseInt(checkbox.name))

    if (image === '') {
      const response = await updateUserProfile({
        variables: {
          options: {
            email: user.email,
            gender: Genders.Withheld,
            firstName: data.firstName,
            lastName: data.lastName,
            about: data.about,
            categories: interests
          }
        }
      })
      if (response.data?.updateUserProfile?.errors) {
        response.data?.updateUserProfile?.errors.forEach(({ field, message }) =>
          //@ts-ignore
          setError(field, { type: 'manual', message: message })
        )
      } else {
        toggleIsOpen()
      }
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'userPictures')

      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )

      const formResponse = await updateUserProfile({
        variables: {
          options: {
            email: user.email,
            gender: Genders.Withheld,
            firstName: data.firstName,
            lastName: data.lastName,
            about: data.about,
            categories: interests,
            displayPicture: imageResponse.data.public_id
          }
        }
      })

      if (formResponse.data?.updateUserProfile?.errors) {
        formResponse.data?.updateUserProfile?.errors.forEach(
          ({ field, message }) =>
            //@ts-ignore
            setError(field, { type: 'manual', message: message })
        )
      } else {
        toggleIsOpen()
      }
    }
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open
        onClose={toggleIsOpen}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-10 w-full">
              <Form
                handleSubmit={handleSubmit}
                onSubmit={handleUpdateUserProfile}
                className="mx-auto modal"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Update User Profile</Dialog.Title>
                  <span onClick={toggleIsOpen}>
                    <XIcon className="clickable" />
                  </span>
                </div>
                <Dialog.Description className="hidden">
                  Update User Profile
                </Dialog.Description>
                <div className="flex flex-wrap gap-5">
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
                <Textarea
                  name="about"
                  label="About"
                  register={register}
                  errors={errors.about}
                  placeholder="Tell us a little bit about yourself."
                  className="w-full h-24 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-md resize-none focus:ring-1 focus:ring-rose-600 focus:outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-gray-700"
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
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div />
                <div className="flex justify-end gap-2">
                  <UploadImageButton
                    label="Upload Profile Picture"
                    setImage={setImage}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <RefreshIcon />
                    )}
                    Update Profile
                  </button>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
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
