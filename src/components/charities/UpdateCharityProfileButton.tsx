import { CharityProfileFragment } from 'generated/graphql'
import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateCharityProfileModal from './UpdateCharityProfileModal'
import { useState } from 'react'
import useToggle from 'utils/useToggle'

export default function UpdateCharityProfileButton({
  charity
}: {
  charity: CharityProfileFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()
  return (
    <>
      <button onClick={toggleIsOpen} className="btn-secondary">
        <PencilAltIcon />
        Update Profile
      </button>
      {isOpen && (
        <UpdateCharityProfileModal
          toggleIsOpen={toggleIsOpen}
          charity={charity}
        />
      )}
    </>
  )
}
