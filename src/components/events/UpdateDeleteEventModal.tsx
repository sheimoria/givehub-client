import * as yup from 'yup'

import {
  CharityDocument,
  EventInfoFragment,
  EventInput,
  useDeleteEventMutation,
  useUpdateEventMutation
} from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'

import Datetime from 'components/forms/Datetime'
import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import React, { Fragment } from 'react'
import Input from 'components/forms/Input'
import { RefreshIcon, XIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TrashIcon } from '@heroicons/react/outline'

type Props = {
  toggleIsOpen: () => void
  event: EventInfoFragment
}

export default function UpdateDeleteEventModal({ toggleIsOpen, event }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: event.name,
      description: event.description,
      dateStart: new Date(parseInt(event.dateStart)),
      dateEnd: new Date(parseInt(event.dateEnd)),
      venue: event.venue
    },
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
  const [updateEvent] = useUpdateEventMutation()
  const [deleteEvent] = useDeleteEventMutation({
    variables: { id: event.id },
    refetchQueries: [
      {
        query: CharityDocument,
        variables: { charityId: event.charity.id }
      }
    ]
  })

  async function handleUpdateEvent(data: EventInput) {
    const response = await updateEvent({
      variables: {
        id: event.id,
        input: data
      },
      refetchQueries: [
        {
          query: CharityDocument,
          variables: { charityId: event.charity.id }
        }
      ]
    })
    if (response.data?.updateEvent?.errors) {
      return response.data?.updateEvent?.errors.map((error) => (
        <p key={error.field}>{error.message}</p>
      ))
    } else {
      toggleIsOpen()
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
                onSubmit={handleUpdateEvent}
                className="mx-auto modal"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Update Event</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
                </div>

                <Dialog.Description>
                  Update or delete your event details below.
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
                <div />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      toggleIsOpen()
                      deleteEvent()
                    }}
                    className="btn-secondary"
                  >
                    <TrashIcon />
                    Delete Event
                  </button>
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
                    Update Event
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
