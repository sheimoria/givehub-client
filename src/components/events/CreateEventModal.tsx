import * as yup from 'yup'

import {
  CharityDocument,
  EventInput,
  useCreateEventMutation
} from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import Datetime from 'components/forms/Datetime'
import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import Textarea from 'components/forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

type Props = {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
}

export default function CreateEventModal({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required('Required'),
        description: yup.string().required('Required'),
        dateStart: yup.date().required('Required'),
        dateEnd: yup.date().required('Required'),
        venue: yup.string().required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const [createEvent] = useCreateEventMutation()
  const router = useRouter()

  async function handleCreateEvent(formData: EventInput) {
    if (image === '') {
      const formResponse = await createEvent({
        variables: {
          charityId: parseInt(router.query.charityId as string),
          input: formData
        },
        refetchQueries: [
          {
            query: CharityDocument,
            variables: { charityId: parseInt(router.query.charityId as string) }
          }
        ]
      })
      if (formResponse.data?.createEvent?.errors) {
        return formResponse.data?.createEvent?.errors.map((error) => (
          <p key={error.field}>{error.message}</p>
        ))
      } else {
        setIsOpen(false)
      }
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'eventImages')
      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )
      const formResponse = await createEvent({
        variables: {
          charityId: parseInt(router.query.charityId as string),
          input: { imageUrl: imageResponse.data.public_id, ...formData }
        },
        refetchQueries: [
          {
            query: CharityDocument,
            variables: { charityId: parseInt(router.query.charityId as string) }
          }
        ]
      })
      if (formResponse.data?.createEvent?.errors) {
        return formResponse.data?.createEvent?.errors.map((error) => (
          <p key={error.field}>{error.message}</p>
        ))
      } else {
        setIsOpen(false)
      }
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
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
              <Form handleSubmit={handleSubmit} onSubmit={handleCreateEvent}>
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Create Event</Dialog.Title>
                  <XIcon
                    onClick={() => setIsOpen(false)}
                    className="clickable-scale"
                  />
                </div>
                <Dialog.Description>
                  Fill in the event details below.
                </Dialog.Description>
                <Input
                  name="name"
                  label="Event Name"
                  register={register}
                  errors={errors.name}
                />
                <Textarea
                  name="description"
                  label="Description"
                  register={register}
                  errors={errors.description}
                />
                <div className="flex flex-wrap gap-6">
                  <Datetime
                    name="dateStart"
                    label="Starts"
                    control={control}
                    errors={errors.dateStart}
                  />
                  <Datetime
                    name="dateEnd"
                    label="Ends"
                    control={control}
                    errors={errors.dateEnd}
                  />
                </div>
                <Input
                  name="venue"
                  label="Venue"
                  register={register}
                  errors={errors.venue}
                />
                <div />
                <UploadImageButton setImage={setImage} />
                <div />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-auto button-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-auto">
                    Create Event
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
