import { CalendarIcon } from '@heroicons/react/outline'
import CreateEvent from 'components/Events/CreateEventModal'
import Transit from 'components/Transit'
import { useState } from 'react'

export default function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transit as="button" onClick={() => setIsOpen(true)} className="py-3">
        <CalendarIcon className="text-white dark:text-white" />
        Create Event
      </Transit>
      <CreateEvent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
