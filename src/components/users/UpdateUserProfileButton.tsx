import { PencilAltIcon } from '@heroicons/react/outline'
import { UserProfileFragment } from 'generated/graphql'
import { useState } from 'react'
import UpdateUserProfileModal from './UpdateUserProfileModal'

export default function UpdateUserProfileButton({
  user
}: {
  user: UserProfileFragment
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
      <UpdateUserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
      />
    </>
  )
}
