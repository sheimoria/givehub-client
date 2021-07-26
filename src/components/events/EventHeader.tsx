import { EventHeaderFragment } from 'generated/graphql'
import Datetime from 'components/events/Datetime'
import Venue from 'components/events/Venue'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Picture from 'components/Picture'

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
          <p>
            {new Date(parseInt(event.createdAt)).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: 'numeric'
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
