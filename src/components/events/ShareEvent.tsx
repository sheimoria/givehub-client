import { EventInfoFragment, useShareEventMutation } from 'generated/graphql'
import { useState } from 'react'

import CreateEventPost from '../posts/ShareEventPost'
import { ShareIcon } from '@heroicons/react/outline'

export default function ShareEvent({ event }: { event: EventInfoFragment }) {
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
