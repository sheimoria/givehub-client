import Datetime from 'components/events/Datetime'
import { EventHeaderFragment } from 'generated/graphql'
import Link from 'next/link'
import Picture from 'components/Picture'
import Venue from 'components/events/Venue'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

export default function EventHeader({ event }: { event: EventHeaderFragment }) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Picture pictureId={event.charity.profile?.displayPicture} size={10} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/charity',
              query: { charityId: event.charity.id }
            }}
            passHref
          >
            <a>{event.charity.name}</a>
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
        <a className="text-base">{event.name}</a>
        <div className="flex flex-wrap gap-3">
          <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
          <Venue venue={event.venue} />
        </div>
      </div>
    </div>
  )
}
