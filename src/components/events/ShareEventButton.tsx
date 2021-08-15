import { EventInfoFragment, useShareEventMutation } from 'generated/graphql'

import CreateEventPost from '../posts/ShareEventModal'
import { ShareIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import useToggle from 'utils/useToggle'

export default function ShareEventButton({
  event
}: {
  event: EventInfoFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <ShareIcon onClick={toggleIsOpen} className="clickable" />
      <CreateEventPost
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        event={event}
      />
    </>
  )
}
