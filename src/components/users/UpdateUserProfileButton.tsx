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
      <button onClick={toggleIsOpen} className="btn-primary">
        <PencilAltIcon />
        Update Profile
      </button>
      {isOpen && (
        <UpdateUserProfileModal toggleIsOpen={toggleIsOpen} user={user} />
      )}
    </>
  )
}
