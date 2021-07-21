import { CalendarIcon, PhotographIcon } from '@heroicons/react/outline'

import CreateEvent from 'components/events/CreateEvent'
import Picture from 'components/Picture'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function CharityPost() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transition
        appear={true}
        show={true}
        enter="transition duration-200"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100"
        leave="transition duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 translate-y-2"
      >
        <article className="flex-row items-start">
          <Picture size={36} />
          <div className="flex flex-col flex-auto gap-4">
            <input
              className="flex-auto bg-gray-100 rounded-full dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              placeholder="New Post"
            />
            <div className="flex gap-4">
              <a>
                <PhotographIcon />
                Add Photo
              </a>
              <a onClick={() => setIsOpen(true)}>
                <CalendarIcon />
                Create Event
              </a>
            </div>
          </div>
        </article>
      </Transition>
      <CreateEvent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
