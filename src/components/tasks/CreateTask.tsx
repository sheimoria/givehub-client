import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import { EventDocument, useCreateTaskMutation } from 'generated/graphql'

import Datetime from 'components/Forms/Datetime'
import Form from 'components/Forms/Form'
import { Fragment } from 'react'
import Textarea from 'components/Forms/Textarea'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

type CreateTaskProps = {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
}

export default function CreateTask({ isOpen, setIsOpen }: CreateTaskProps) {
  const [createEvent] = useCreateTaskMutation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        description: yup.string().required('Required'),
        deadline: yup.date().required('Required')
      })
    )
  })
  const router = useRouter()

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
                onSubmit={handleCreateTask}
                className="w-96"
              >
                <Dialog.Title as="h5">Create Task</Dialog.Title>
                <Dialog.Description className="sr-only"></Dialog.Description>
                <Textarea
                  name="description"
                  label="Description"
                  register={register}
                  errors={errors.description}
                  placeholder="Description"
                  srOnly
                />
                <Datetime
                  name="deadline"
                  label="Deadline"
                  control={control}
                  errors={errors.deadline}
                  srOnly
                  placeholder="Deadline"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-auto button-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-auto">
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
