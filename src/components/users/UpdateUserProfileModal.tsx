import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import { UserProfileFragment, UserProfileUpdateInput } from 'generated/graphql'

import Checkbox from 'components/forms/Checkbox'
import Form from 'components/forms/Form'
import { Fragment } from 'react'
import Input from 'components/forms/Input'
import { PhotographIcon } from '@heroicons/react/outline'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useUpdateUserProfileMutation } from 'generated/graphql'
import { yupResolver } from '@hookform/resolvers/yup'

type Props = {
  setIsOpen: (arg0: boolean) => void
  user: UserProfileFragment
}

export default function UpdateUserProfileModal({ setIsOpen, user }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
      email: user.email,
      about: user.profile?.about,
      telegramHandle: user.profile?.telegramHandle
    },
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        email: yup.string().email().required('Required'),
        about: yup.string().required('Required'),
        telegramHandle: yup.string().required('Required')
      })
    )
  })
  const [updateUserProfile] = useUpdateUserProfileMutation()

  async function handleUpdateUserProfile(options: UserProfileUpdateInput) {
    const categories = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox: Checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox: Checkbox) => parseInt(checkbox.name))

    const response = await updateUserProfile({
      variables: {
        options: {
          firstName: options.firstName,
          lastName: options.lastName,
          email: options.email,
          about: options.about,
          categories: categories
        }
      }
    })
    if (response.data?.updateUserProfile?.errors) {
      response.data.updateUserProfile.errors.forEach(({ field, message }) =>
        //@ts-ignore
        setError(field, { type: 'manual', message: message })
      )
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open
        onClose={() => setIsOpen(false)}
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
            <Form
              handleSubmit={handleSubmit}
              onSubmit={handleUpdateUserProfile}
              className="z-10 w-96"
            >
              <div className="flex justify-between">
                <Dialog.Title as="h5">Update User Profile</Dialog.Title>
                <span onClick={() => setIsOpen(false)}>
                  <XIcon className="clickable-scale" />
                </span>
              </div>
              <Dialog.Description className="hidden">
                Update your user profile information
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
              <Input
                name="telegramHandle"
                label="Telegram Handle"
                register={register}
                errors={errors.telegramHandle}
              />
              <Input
                name="email"
                label="Email Address"
                register={register}
                errors={errors.email}
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
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div />
              <div className="flex justify-between">
                <a>
                  <PhotographIcon />
                  Add Photo
                </a>
                <button type="submit">Post</button>
              </div>
            </Form>
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
