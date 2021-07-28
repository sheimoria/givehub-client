import { Dialog, Transition } from '@headlessui/react'
import { EventTasksDocument, useDeleteTaskMutation } from 'generated/graphql'

import { Fragment } from 'react'
import router from 'next/router'

type Props = {
  toggleIsOpen: () => void
  taskId: number
}

export default function DeleteTaskModal({ toggleIsOpen, taskId }: Props) {
  const [deleteTask] = useDeleteTaskMutation({
    variables: { taskId: taskId },
    refetchQueries: [
      {
        query: EventTasksDocument,
        variables: { eventId: parseInt(router.query.eventId as string) }
      }
    ]
  })

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
            <article className="z-10">
              <Dialog.Title as="h5">Delete Task</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete this task? This action cannot be
                undone.
              </Dialog.Description>
              <button
                onClick={() => {
                  deleteTask()
                  toggleIsOpen()
                }}
                className="focus:outline-none"
              >
                Delete Task
              </button>
            </article>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
