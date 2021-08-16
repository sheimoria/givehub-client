import * as yup from 'yup'

import {
  CharityDocument,
  EventInput,
  useCreateEventMutation
} from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import Datetime from 'components/forms/Datetime'
import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import Input from 'components/forms/Input'
import Textarea from 'components/forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { CalendarIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateEventModal({
  toggleIsOpen
}: {
  toggleIsOpen: () => void
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
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
        toggleIsOpen()
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
        toggleIsOpen()
      }
    }
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open
        onClose={() => toggleIsOpen()}
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
                onSubmit={handleCreateEvent}
                className="mx-auto modal"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Create Event</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
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
                  className="w-full h-24 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-md resize-none focus:ring-1 focus:ring-rose-600 focus:outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-gray-700"
                />
                <div className="flex flex-wrap gap-4">
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
                <div className="flex justify-end gap-2">
                  <UploadImageButton setImage={setImage} />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <CalendarIcon />
                    )}
                    Post
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
