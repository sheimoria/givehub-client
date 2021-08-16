import { CalendarIcon } from '@heroicons/react/outline'
import CreateEvent from 'components/events/CreateEventModal'
import Transit from 'components/Transit'
import useToggle from 'utils/useToggle'

export default function CreateEventButton() {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit
        as="button"
        onClick={toggleIsOpen}
        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-rose-600 hover:bg-rose-700"
      >
        <CalendarIcon />
        Create Event
      </Transit>
      {isOpen && <CreateEvent toggleIsOpen={toggleIsOpen} />}
    </>
  )
}
