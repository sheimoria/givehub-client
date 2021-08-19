import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import CharityHeader from 'components/charities/CharityHeader'
import { CharityHeaderFragment } from 'generated/graphql'
import { Fragment } from 'react'

type Props = { toggleIsOpen: () => void; charities: CharityHeaderFragment[] }

export default function UserCharitiesModal({ toggleIsOpen, charities }: Props) {
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
                <Dialog.Title as="h5">Followed Charities</Dialog.Title>
                <XIcon onClick={toggleIsOpen} className="clickable" />
              </div>
              {charities.map((charity) => (
                <CharityHeader key={charity.id} charity={charity} />
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
