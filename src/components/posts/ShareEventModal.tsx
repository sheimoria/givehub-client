import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import {
  EventInfoFragment,
  PostInput,
  PostsDocument,
  useShareEventMutation
} from 'generated/graphql'

import EventPreview from '../events/EventPreview'
import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import { Fragment } from 'react'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type ShareEventPostProps = {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
  event: EventInfoFragment
}

export default function ShareEventModal({
  isOpen,
  setIsOpen,
  event
}: ShareEventPostProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        text: yup.string().required('Required')
      })
    )
  })
  const [shareEvent] = useShareEventMutation()

  async function handleShareEvent(values: PostInput) {
    const response = await shareEvent({
      variables: {
        input: values,
        id: event.id
      },
      refetchQueries: [
        {
          query: PostsDocument,
          variables: { cursor: null, limit: 50 }
        }
      ]
    })
    if (response.data?.shareEvent?.errors) {
      response.data?.shareEvent?.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else {
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
        <div className="flex items-center justify-center min-h-screen p-5">
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
                onSubmit={handleShareEvent}
                className="max-w-2xl px-0"
              >
                <div className="flex justify-between px-5">
                  <Dialog.Title as="h5">Share Event</Dialog.Title>
                  <XIcon
                    className="clickable-scale"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <Textarea
                  srOnly
                  name="text"
                  label="Text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="p-0 px-5 bg-white border-none dark:bg-gray-800 focus:ring-0"
                />
                <EventPreview event={event} />
                <FormButton label="Share" isSubmitting={isSubmitting} />
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
