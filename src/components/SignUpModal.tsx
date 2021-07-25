import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
}

export default function SignUpModal({ isOpen, setIsOpen }: Props) {
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
            <article className="z-10">
              <Dialog.Title as="h5">Sign up as user first</Dialog.Title>
              <Dialog.Description>
                After logging in, you can add your charity to your user account.
              </Dialog.Description>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none"
              >
                Got it
              </button>
            </article>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
