import { CharityProfileFragment } from 'generated/graphql'
import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateCharityProfileModal from './UpdateCharityProfileModal'
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
      {isOpen && (
        <UpdateCharityProfileModal setIsOpen={setIsOpen} charity={charity} />
      )}
    </>
  )
}
