import * as yup from 'yup'

import { CharityDocument, useCreateEventMutation } from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import Datetime from 'components/forms/Datetime'
import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

type CreateEventProps = {
  isOpen: boolean
  setIsOpen: (boolean) => void
}

export default function CreateEvent({ isOpen, setIsOpen }: CreateEventProps) {
  const [createEvent] = useCreateEventMutation()
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
  const router = useRouter()

  async function handleCreateEvent(values) {
    const response = await createEvent({
      variables: {
        charityId: parseInt(router.query.charityId as string),
        input: values
      },
      refetchQueries: [
        {
          query: CharityDocument,
          variables: { charityId: parseInt(router.query.charityId as string) }
        }
      ]
    })
    if (response.data.createEvent.errors) {
      return response.data.createEvent.errors.map((error) => (
        <p key={error.field}>{error.message}</p>
      ))
    } else if (response.data.createEvent.success) {
      setIsOpen(false)
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
                <Dialog.Title as="h5">Create Event</Dialog.Title>
                <Dialog.Description>
                  Fill in the event details below.
                </Dialog.Description>
                <Input
                  name="name"
                  label="Event Name"
                  register={register}
                  errors={errors.name}
                />
                <Input
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
                <div className="flex gap-2">
                  <button type="submit" className="button-highlight">
                    Create Event
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="button-neutral"
                  >
                    Cancel
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
