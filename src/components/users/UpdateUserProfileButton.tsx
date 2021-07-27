import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateUserProfileModal from './UpdateUserProfileModal'
import { UserProfileFragment } from 'generated/graphql'
import { useState } from 'react'

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
      {isOpen && <UpdateUserProfileModal setIsOpen={setIsOpen} user={user} />}
    </>
  )
}
