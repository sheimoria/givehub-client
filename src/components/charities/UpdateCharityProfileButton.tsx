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
      <button onClick={() => setIsOpen(true)} className="btn-secondary">
        <PencilAltIcon />
        Update Profile
      </button>
      {isOpen && (
        <UpdateCharityProfileModal setIsOpen={setIsOpen} charity={charity} />
      )}
    </>
  )
}
