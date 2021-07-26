import { PencilAltIcon } from '@heroicons/react/outline'
import { EventInfoFragment } from 'generated/graphql'
import { useState } from 'react'
import UpdateDeleteEventModal from './UpdateDeleteEventModal'

export default function UpdateDeleteEventButton({
  event
}: {
  event: EventInfoFragment
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
      <UpdateDeleteEventModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        event={event}
      />
    </>
  )
}
