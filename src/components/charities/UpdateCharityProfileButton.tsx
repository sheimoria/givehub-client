import { PencilAltIcon } from '@heroicons/react/outline'
import { CharityProfileFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UpdateCharityProfileButton({
  charity
}: {
  charity: CharityProfileFragment
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
      {/* <UpdateUserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
      /> */}
    </>
  )
}
