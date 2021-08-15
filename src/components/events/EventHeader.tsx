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
      <div className="flex items-center gap-3">
        <Picture pictureId={event.charity.profile?.displayPicture} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/charity',
              query: { charityId: event.charity.id }
            }}
            passHref
          >
            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">
              {event.charity.name}
            </a>
          </Link>
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
        className="flex flex-col gap-3 cursor-pointer"
      >
        <h5 className="hover:text-gray-800 dark:hover:text-gray-100">
          {event.name}
        </h5>
        <div className="flex flex-wrap gap-4">
          <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
          <Venue venue={event.venue} />
        </div>
      </div>
    </section>
  )
}
