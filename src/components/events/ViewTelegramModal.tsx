import { Dialog, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import Picture from 'components/Picture'
import { UserHeaderFragment } from 'generated/graphql'
import { XIcon } from '@heroicons/react/outline'

type Props = {
  toggleIsOpen: () => void
  volunteers: UserHeaderFragment[]
}

export default function ViewTelegramModal({ toggleIsOpen, volunteers }: Props) {
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
            <dl className="z-10 w-96">
              <div className="flex items-center justify-between gap-4">
                <Dialog.Title as="h5">Telegram Usernames</Dialog.Title>
                <XIcon onClick={toggleIsOpen} className="clickable" />
              </div>
              <Dialog.Description className="sr-only">
                Telegram Usernames of Assigned Volunteers
              </Dialog.Description>
              {volunteers.map((volunteer: UserHeaderFragment) => (
                <div key={volunteer.id} className="flex items-center gap-4">
                  <Picture pictureId={volunteer.profile?.displayPicture} />
                  <div className="flex flex-col gap-1">
                    <h6>
                      {volunteer.profile?.firstName}{' '}
                      {volunteer.profile?.lastName}
                    </h6>
                    <div className="flex items-center gap-2 text-sm text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-telegram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                      </svg>
                      {volunteer.profile?.telegramHandle}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button onClick={toggleIsOpen} className="btn-primary">
                  Done
                </button>
              </div>
            </dl>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
