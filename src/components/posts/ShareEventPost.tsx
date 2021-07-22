import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import {
  EventInfoFragment,
  PostsDocument,
  useShareEventMutation
} from 'generated/graphql'
import React, { Fragment } from 'react'

import EventPreview from '../events/EventPreview'
import Form from 'components/forms/Form'
import { PhotographIcon } from '@heroicons/react/outline'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { validateSDL } from 'graphql/validation/validate'
import { yupResolver } from '@hookform/resolvers/yup'

type ShareEventPostProps = {
  isOpen: boolean
  setIsOpen: (boolean) => void
  eventInfo: EventInfoFragment
}

export default function ShareEventPost({
  isOpen,
  setIsOpen,
  eventInfo
}: ShareEventPostProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        text: yup.string().required('Required')
      })
    )
  })
  const [shareEvent] = useShareEventMutation()

  async function handleShareEvent(values) {
    const response = await shareEvent({
      variables: {
        input: values,
        id: eventInfo.id
      },
      refetchQueries: [
        {
          query: PostsDocument,
          variables: { cursor: null, limit: 50 }
        }
      ]
    })
    if (response.data.shareEvent.errors) {
      response.data.shareEvent.errors.forEach(({ field, message }) =>
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
                onSubmit={handleShareEvent}
                className="max-w-2xl"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Share Event</Dialog.Title>
                  <span onClick={() => setIsOpen(false)}>
                    <XIcon />
                  </span>
                </div>
                <Dialog.Description className="hidden">
                  What is on your mind?
                </Dialog.Description>
                <Textarea
                  name="text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="p-0 bg-white border-none dark:bg-gray-800 focus:ring-0"
                />
                <EventPreview eventInfo={eventInfo} />
                <div className="flex justify-between">
                  <a>
                    <PhotographIcon />
                    Add Photo
                  </a>
                  <button type="submit">Post</button>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
