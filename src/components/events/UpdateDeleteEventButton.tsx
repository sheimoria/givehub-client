import { EventInfoFragment } from 'generated/graphql'
import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateDeleteEventModal from 'components/events/UpdateDeleteEventModal'
import { useState } from 'react'
import useToggle from 'utils/useToggle'

export default function UpdateDeleteEventButton({
  event
}: {
  event: EventInfoFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()
  return (
    <>
      <PencilAltIcon className="clickable" onClick={toggleIsOpen} />
      {isOpen && (
        <UpdateDeleteEventModal toggleIsOpen={toggleIsOpen} event={event} />
      )}
    </>
  )
}
