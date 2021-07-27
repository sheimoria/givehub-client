import { CalendarIcon } from '@heroicons/react/outline'
import CreateEvent from 'components/events/CreateEventModal'
import Transit from 'components/Transit'
import useToggle from 'utils/useToggle'

export default function CreateEventButton() {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit as="button" onClick={() => toggleIsOpen()} className="py-3">
        <CalendarIcon className="text-white dark:text-white" />
        Create Event
      </Transit>
      {isOpen && <CreateEvent toggleIsOpen={toggleIsOpen} />}
    </>
  )
}
