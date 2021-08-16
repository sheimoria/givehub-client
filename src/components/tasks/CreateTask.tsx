import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import { EventDocument, useCreateTaskMutation } from 'generated/graphql'

import Datetime from 'components/forms/Datetime'
import Form from 'components/forms/Form'
import { Fragment } from 'react'
import Textarea from 'components/forms/Textarea'
import { useForm } from 'react-hook-form'
import router from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { XIcon } from '@heroicons/react/outline'
import { ClipboardCheckIcon } from '@heroicons/react/outline'

type CreateTaskProps = {
  isOpen: boolean
  toggleIsOpen: () => void
}

export default function CreateTask({ isOpen, toggleIsOpen }: CreateTaskProps) {
  const [createEvent] = useCreateTaskMutation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        description: yup.string().required('Required'),
        deadline: yup.date().required('Required')
      })
    )
  })

  async function handleCreateTask(values: {
    description: string
    deadline: string
  }) {
    const response = await createEvent({
      variables: {
        taskInput: values,
        eventId: parseInt(router.query.eventId as string)
      },
      refetchQueries: [
        {
          query: EventDocument,
          variables: { id: parseInt(router.query.eventId as string) }
        }
      ]
    })
    if (response.data?.createTask?.errors) {
      return response.data?.createTask?.errors.map((error) => (
        <p key={error.field}>{error.message}</p>
      ))
    } else if (response.data?.createTask?.success) {
      toggleIsOpen()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
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
                onSubmit={handleCreateTask}
                className="mx-auto modal"
              >
                <div className="flex items-center justify-between gap-4">
                  <Dialog.Title as="h5">Create Task</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
                </div>
                <Dialog.Description className="sr-only"></Dialog.Description>
                <Textarea
                  name="description"
                  label="Description"
                  register={register}
                  errors={errors.description}
                  placeholder="Description"
                  srOnly
                  className="w-full h-24 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-md resize-none focus:ring-1 focus:ring-rose-600 focus:outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-gray-700"
                />
                <Datetime
                  name="deadline"
                  label="Deadline"
                  control={control}
                  errors={errors.deadline}
                  srOnly
                  placeholder="Deadline"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <ClipboardCheckIcon />
                    )}
                    Create Task
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
