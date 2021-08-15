import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateUserProfileModal from './UpdateUserProfileModal'
import { UserProfileFragment } from 'generated/graphql'
import { useState } from 'react'
import useToggle from 'utils/useToggle'

export default function UpdateUserProfileButton({
  user
}: {
  user: UserProfileFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()
  return (
    <>
      <button
        onClick={toggleIsOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-rose-200 bg-rose-100 text-rose-600 dark:hover:text-rose-500 hover:text-rose-700"
      >
        <PencilAltIcon />
        Update Profile
      </button>
      {isOpen && (
        <UpdateUserProfileModal toggleIsOpen={toggleIsOpen} user={user} />
      )}
    </>
  )
}
