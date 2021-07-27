import { EventInfoFragment, useShareEventMutation } from 'generated/graphql'

import CreateEventPost from '../posts/ShareEventModal'
import { ShareIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export default function ShareEventButton({
  event
}: {
  event: EventInfoFragment
}) {
  const [shareEvent] = useShareEventMutation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ShareIcon
        className="transition cursor-pointer hover:scale-110"
        onClick={() => setIsOpen(true)}
      />
      <CreateEventPost isOpen={isOpen} setIsOpen={setIsOpen} event={event} />
    </>
  )
}
