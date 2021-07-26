import { PencilAltIcon } from '@heroicons/react/outline'
import { EventInfoFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UpdateEventButton({
  event
}: {
  event: EventInfoFragment | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
    </>
  )
}
