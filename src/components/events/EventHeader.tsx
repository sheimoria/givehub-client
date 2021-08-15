import Datetime from 'components/events/Datetime'
import { EventHeaderFragment } from 'generated/graphql'
import Link from 'next/link'
import Picture from 'components/Picture'
import Venue from 'components/events/Venue'
import { formatDistanceToNow } from 'date-fns'
import router, { useRouter } from 'next/router'

export default function EventHeader({ event }: { event: EventHeaderFragment }) {
  return (
    <section>
      <div
        onClick={() =>
          router.push({
            pathname: '/charity',
            query: { charityId: event.charity.id }
          })
        }
        className="flex items-center gap-4 cursor-pointer"
      >
        <Picture pictureId={event.charity.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
            {event.charity.name}
          </h6>
          <p className="text-xs">
            {formatDistanceToNow(parseInt(event.createdAt), {
              addSuffix: true,
              includeSeconds: true
            })}
          </p>
        </div>
      </div>
      <div
        onClick={() =>
          router.push({ pathname: '/event', query: { eventId: event.id } })
        }
        className="flex flex-col gap-4 cursor-pointer"
      >
        <h5 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
          {event.name}
        </h5>
        <div className="flex flex-wrap gap-y-2 gap-x-4">
          <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
          <Venue venue={event.venue} />
        </div>
      </div>
    </section>
  )
}
