import { EventSnippetFragment } from 'generated/graphql'
import Venue from 'components/events/Venue'
import router from 'next/router'
import { ClockIcon } from '@heroicons/react/outline'
import { formatDistanceToNow } from 'date-fns'

export default function EventSnippet({
  event
}: {
  event: EventSnippetFragment
}) {
  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/event`,
          query: { eventId: event.id }
        })
      }
      className="flex flex-col gap-2 p-4 rounded-md cursor-pointer bordered"
    >
      <div className="flex flex-col">
        <h5 className="truncate transition-colors hover:text-gray-800 dark:hover:text-gray-100">
          {event.name}
        </h5>
        <p>{event.charity.name}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="text-rose-600" />
          <p>In {formatDistanceToNow(parseInt(event.dateStart))}</p>
        </div>
        <Venue venue={event.venue} />
      </div>
    </div>
  )
}
