import { CalendarIcon, PhotographIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

import CreateEvent from 'components/events/CreateEvent'
import CreatePost from 'components/posts/CreatePost'
import Picture from 'components/Picture'
import { Transition } from '@headlessui/react'
import { UserPostFragment } from 'generated/graphql'

export default function UserPost({ userPost }: { userPost: UserPostFragment }) {
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
        <article className="flex-row">
          <Picture size={36} />
          <input
            onClick={() => setIsOpen(true)}
            placeholder="New Post"
            className="flex-auto bg-gray-100 rounded-full dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          />
        </article>
      </Transition>
      <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
