import { EventInfoFragment } from 'generated/graphql'
import { PencilAltIcon } from '@heroicons/react/outline'
import UpdateDeleteEventModal from 'components/Events/UpdateDeleteEventModal'
import { useState } from 'react'

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
      {isOpen && <UpdateDeleteEventModal setIsOpen={setIsOpen} event={event} />}
    </>
  )
}
