import * as yup from 'yup'

import {
  Genders,
  HeaderFragment,
  UserProfileUpdateInput,
  useUpdateUserProfileMutation
} from 'generated/graphql'

import Checkbox from '../forms/Checkbox'
import Form from '../forms/Form'
import Input from '../forms/Input'
import Textarea from '../forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateUserProfile({ me }: { me: HeaderFragment }) {
  const [createUserProfile] = useUpdateUserProfileMutation()
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
        telegramHandle: yup.string().required('Required'),
        about: yup.string().required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const router = useRouter()

  async function handleCreateUserProfile(formData: UserProfileUpdateInput) {
    const interests = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox: Checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox: Checkbox) => parseInt(checkbox.name))

    if (image === '') {
      const formResponse = await createUserProfile({
        variables: {
          options: {
            email: me.email,
            gender: Genders.Withheld,
            firstName: formData.firstName,
            lastName: formData.lastName,
            about: formData.about,
            categories: interests,
            telegramHandle: formData.telegramHandle
          }
        }
      })
      if (formResponse.data?.updateUserProfile?.errors) {
        formResponse.data?.updateUserProfile?.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
        console.log(me.email)
      } else {
        router.replace('/home')
      }
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'userPictures')

      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )

      const formResponse = await createUserProfile({
        variables: {
          options: {
            email: me.email,
            gender: Genders.Withheld,
            firstName: formData.firstName,
            lastName: formData.lastName,
            about: formData.about,
            categories: interests,
            telegramHandle: formData.telegramHandle,
            displayPicture: imageResponse.data.public_id
          }
        }
      })

      if (formResponse.data?.updateUserProfile?.errors) {
        formResponse.data?.updateUserProfile?.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else {
        router.replace('/home')
      }
    }
  }

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={handleCreateUserProfile}
        className="place-self-center"
      >
        <h5>Fill In User Profile</h5>
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
          name="telegramHandle"
          label="Telegram Username"
          register={register}
          errors={errors.telegramHandle}
          placeholder="For charities to contact volunteers"
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
        <UploadImageButton label="Upload Profile Picture" setImage={setImage} />
        <div />
        <button type="submit">Continue</button>
      </Form>
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
