import * as yup from 'yup'

import {
  CharityProfileFragment,
  useUpdateCharityProfileMutation
} from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import Checkbox from 'components/Forms/Checkbox'
import Form from 'components/Forms/Form'
import FormButton from 'components/Forms/FormButton'
import Input from 'components/Forms/Input'
import Textarea from 'components/Forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type Props = {
  setIsOpen: (arg0: boolean) => void
  charity: CharityProfileFragment
}

export default function UpdateCharityProfileModal({
  setIsOpen,
  charity
}: Props) {
  const defaultCategories = Object.fromEntries(
    charity.categories.map((category) => [category.id, 'checked'])
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      physicalAddress: charity.physicalAddress,
      postalCode: charity.postalCode,
      about: charity.profile?.about,
      links: charity.profile?.links,
      contactNumber: charity.profile?.contactNumber,
      email: charity.profile?.email,
      ...defaultCategories
    },
    resolver: yupResolver(
      yup.object().shape({
        about: yup.string().required('Required'),
        email: yup.string().email('Invalid').required('Required'),
        contactNumber: yup.string().length(8, '8 Digits').required('Required'),
        links: yup.string().url('Invalid URL').required('Required'),
        physicalAddress: yup.string().required('Required'),
        postalCode: yup.string().length(6, '6 Digits').required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const [updateCharityProfile] = useUpdateCharityProfileMutation()

  type FormData = {
    physicalAddress: string
    postalCode: string
    about: string
    links: string
    email: string
    contactNumber: string
    categories: number[]
    displayPicture: File
  }

  async function handleUpdateCharityProfile(data: FormData) {
    const categories = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox) => parseInt(checkbox.name))

    if (image === '') {
      const response = await updateCharityProfile({
        variables: {
          charityId: charity.id,
          options: {
            name: charity.name,
            physicalAddress: data.physicalAddress,
            postalCode: data.postalCode,
            about: data.about,
            links: data.links,
            email: data.email,
            contactNumber: data.contactNumber,
            categories: categories
          }
        }
      })
      if (response.data?.updateCharityProfile?.errors) {
        response.data?.updateCharityProfile?.errors.forEach(
          ({ field, message }) =>
            //@ts-ignore
            setError(field, { type: 'manual', message: message })
        )
      } else {
        setIsOpen(false)
      }
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'charityPictures')
      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )
      const response = await updateCharityProfile({
        variables: {
          charityId: charity.id,
          options: {
            name: charity.name,
            physicalAddress: data.physicalAddress,
            postalCode: data.postalCode,
            about: data.about,
            email: data.email,
            contactNumber: data.contactNumber,
            links: data.links,
            categories: categories,
            displayPicture: imageResponse.data.public_id
          }
        }
      })
      if (response.data?.updateCharityProfile?.errors) {
        response.data?.updateCharityProfile?.errors.forEach(
          ({ field, message }) =>
            // @ts-ignore
            setError(field, { type: 'manual', message: message })
        )
      } else {
        setIsOpen(false)
      }
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
            <div className="z-10">
              <Form
                handleSubmit={handleSubmit}
                onSubmit={handleUpdateCharityProfile}
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Update Charity Profile</Dialog.Title>
                  <XIcon
                    onClick={() => setIsOpen(false)}
                    className="clickable-scale"
                  />
                </div>
                <Dialog.Description className="hidden">
                  Update Charity Profile
                </Dialog.Description>
                <h6>Which categories does your charity fall under?</h6>
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
                <Textarea
                  name="about"
                  label="About"
                  placeholder="Let others understand what your charity does."
                  register={register}
                  errors={errors.about}
                />
                <div className="flex flex-wrap gap-6">
                  <Input
                    name="email"
                    label="Email Address"
                    register={register}
                    errors={errors.email}
                  />
                  <Input
                    name="contactNumber"
                    label="Contact Number"
                    register={register}
                    errors={errors.contactNumber}
                  />
                </div>
                <Input
                  name="links"
                  label="Website"
                  register={register}
                  errors={errors.links}
                />
                <div className="flex flex-wrap gap-6">
                  <Input
                    name="physicalAddress"
                    label="Address"
                    register={register}
                    errors={errors.physicalAddress}
                  />
                  <Input
                    name="postalCode"
                    label="Postal Code"
                    register={register}
                    errors={errors.postalCode}
                  />
                </div>
                <div />
                <UploadImageButton
                  label="Update Profile Picture"
                  setImage={setImage}
                />
                <div />
                <FormButton label="Update" isSubmitting={isSubmitting} />
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
