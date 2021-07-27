import * as yup from 'yup'

import {
  useCreateCharityMutation,
  useUpdateCharityProfileMutation
} from 'generated/graphql'

import Checkbox from '../forms/Checkbox'
import Form from '../forms/Form'
import Input from '../forms/Input'
import Textarea from '../forms/Textarea'
import Transit from 'components/Transit'
import UploadImageButton from 'components/UploadImageButton'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateCharity() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('Required'),
        uen: yup.string().required('Required'),
        about: yup.string().required('Required'),
        email: yup.string().email('Invalid').required('Required'),
        contactNumber: yup.string().length(8, '8 Digits').required('Required'),
        links: yup
          .string()
          .url('Website link must be a legitimate URL')
          .required('Required'),
        physicalAddress: yup.string().required('Required'),
        postalCode: yup.string().length(6, '6 Digits').required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const [createCharity] = useCreateCharityMutation()
  const [updateCharityProfile] = useUpdateCharityProfileMutation()
  const router = useRouter()

  type FormData = {
    uen: string
    name: string
    physicalAddress: string
    postalCode: string
    about: string
    links: string
    email: string
    contactNumber: string
  }

  async function handleCreateCharity(data: FormData) {
    const categories = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      //@ts-ignore
      .filter((checkbox) => checkbox.checked)
      //@ts-ignore
      .map((checkbox) => parseInt(checkbox.name))

    if (image === '') {
      const createCharityResponse = await createCharity({
        variables: {
          options: {
            uen: data.uen,
            name: data.name,
            physicalAddress: data.physicalAddress,
            postalCode: data.postalCode
          }
        }
      })
      if (createCharityResponse.data?.createCharity?.errors) {
        createCharityResponse.data.createCharity.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else if (createCharityResponse.data?.createCharity?.success) {
        const updateCharityProfileResponse = await updateCharityProfile({
          variables: {
            charityId: createCharityResponse.data?.createCharity?.charity
              ?.id as number,
            options: {
              name: createCharityResponse.data?.createCharity?.charity
                ?.name as string,
              physicalAddress: createCharityResponse.data?.createCharity
                ?.charity?.physicalAddress as string,
              postalCode: createCharityResponse.data?.createCharity?.charity
                ?.postalCode as string,
              about: data.about,
              links: data.links,
              categories: categories
            }
          }
        })
        if (updateCharityProfileResponse.data?.updateCharityProfile?.errors) {
          updateCharityProfileResponse.data?.updateCharityProfile?.errors.forEach(
            ({ field, message }) =>
              setError(field, { type: 'manual', message: message })
          )
        } else {
          router.replace({
            pathname: '/charity',
            query: {
              charityId: createCharityResponse.data?.createCharity?.charity?.id
            }
          })
        }
      }
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'charityPictures')

      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )

      const createCharityResponse = await createCharity({
        variables: {
          options: {
            uen: data.uen,
            name: data.name,
            physicalAddress: data.physicalAddress,
            postalCode: data.postalCode
          }
        }
      })
      if (createCharityResponse.data?.createCharity?.errors) {
        createCharityResponse.data.createCharity.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else if (createCharityResponse.data?.createCharity?.success) {
        const updateCharityProfileResponse = await updateCharityProfile({
          variables: {
            charityId: createCharityResponse.data?.createCharity?.charity
              ?.id as number,
            options: {
              name: createCharityResponse.data?.createCharity?.charity
                ?.name as string,
              physicalAddress: createCharityResponse.data?.createCharity
                ?.charity?.physicalAddress as string,
              postalCode: createCharityResponse.data?.createCharity?.charity
                ?.postalCode as string,
              about: data.about,
              links: data.links,
              email: data.email,
              contactNumber: data.contactNumber,
              categories: categories,
              displayPicture: imageResponse.data.public_id
            }
          }
        })
        if (updateCharityProfileResponse.data?.updateCharityProfile?.errors) {
          updateCharityProfileResponse.data?.updateCharityProfile?.errors.forEach(
            ({ field, message }) =>
              setError(field, { type: 'manual', message: message })
          )
        } else {
          router.replace({
            pathname: '/charity',
            query: {
              charityId: createCharityResponse.data?.createCharity?.charity?.id
            }
          })
        }
      }
    }
  }

  return (
    <Transit onEveryMount>
      <Form handleSubmit={handleSubmit} onSubmit={handleCreateCharity}>
        <h5>Charity Sign Up</h5>
        <div className="flex flex-wrap gap-6">
          <Input
            name="name"
            label="Charity Name"
            register={register}
            errors={errors.name}
          />
          <Input
            name="uen"
            label="Unique Entity Number (UEN)"
            register={register}
            errors={errors.uen}
          />
        </div>
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
                  errors={errors[category.name]}
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
        <UploadImageButton label="Upload Profile Picture" setImage={setImage} />
        <div />
        <button type="submit">Sign Up</button>
      </Form>
    </Transit>
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
