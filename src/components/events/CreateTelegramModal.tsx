import * as yup from 'yup'

import { useCreateTelegramMutation } from 'generated/graphql'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import Input from 'components/forms/Input'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateTelegramModal({
  toggleIsOpen
}: {
  toggleIsOpen: () => void
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        groupName: yup.string().required('Required'),
        groupDescription: yup.string().required('Required')
      })
    )
  })
  const [createTelegram] = useCreateTelegramMutation()
  const router = useRouter()

  type FormData = {
    groupName: string
    groupDescription: string
  }

  async function handleCreateTelegram(data: FormData) {
    const response = await createTelegram({
      variables: {
        eventId: parseInt(router.query.eventId as string),
        ...data
      }
    })
    if (response.data?.createTelegramGroupForEvent?.errors) {
      response.data?.createTelegramGroupForEvent?.errors.forEach(
        ({ field, message }) =>
          setError(field, { type: 'manual', message: message })
      )
    } else {
      toggleIsOpen()
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
            <div className="z-10">
              <Form
                handleSubmit={handleSubmit}
                onSubmit={handleCreateTelegram}
                className="modal"
              >
                <div className="flex justify-between w-96">
                  <Dialog.Title as="h5">Create Telegram Group</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
                </div>
                <Dialog.Description className="sr-only">
                  Fill in the telegram group details below.
                </Dialog.Description>
                <Input
                  name="groupName"
                  label="Group Name"
                  register={register}
                  errors={errors.groupName}
                />
                <Textarea
                  name="groupDescription"
                  label="Group Description"
                  register={register}
                  errors={errors.groupDescription}
                />
                <FormButton label="Create" isSubmitting={isSubmitting} />
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
