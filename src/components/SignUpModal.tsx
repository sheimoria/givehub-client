import { Dialog, Transition } from '@headlessui/react'
import { ThumbUpIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'

type Props = {
  isOpen: boolean
  toggleIsOpen: () => void
}

export default function SignUpModal({ isOpen, toggleIsOpen }: Props) {
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
            <article className="z-10 px-6 pb-6">
              <Dialog.Title as="h5">Sign up as user first</Dialog.Title>
              <Dialog.Description>
                After logging in, you can add your charity to your account.
              </Dialog.Description>
              <button
                onClick={toggleIsOpen}
                className="btn-primary focus:outline-none place-self-start"
              >
                <ThumbUpIcon />
                Got it
              </button>
            </article>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
