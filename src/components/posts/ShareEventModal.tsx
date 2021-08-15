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
import router from 'next/router'
import { ShareIcon } from '@heroicons/react/outline'

type ShareEventPostProps = {
  isOpen: boolean
  toggleIsOpen: () => void
  event: EventInfoFragment
}

export default function ShareEventModal({
  isOpen,
  toggleIsOpen,
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
      toggleIsOpen
      router.push('/home')
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={toggleIsOpen}
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
                className="modal"
              >
                <div className="flex justify-between gap-4">
                  <Dialog.Title as="h5">Share Event</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
                </div>
                <Textarea
                  srOnly
                  name="text"
                  label="Text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="w-full h-24 p-0 text-gray-700 placeholder-gray-500 border-none resize-none dark:placeholder-gray-400 dark:text-gray-200 focus:outline-none focus:ring-0"
                />
                <EventPreview event={event} />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-rose-600 hover:bg-rose-700"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <ShareIcon />
                    )}
                    Share
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
