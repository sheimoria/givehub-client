import { EventHeaderFragment } from 'generated/graphql'
import Image from 'next/image'
import Datetime from 'components/events/Datetime'
import Venue from 'components/events/Venue'
import { useRouter } from 'next/router'

export default function EventHeader({ event }: { event: EventHeaderFragment }) {
  const router = useRouter()

  return (
    <div
      className="flex flex-col gap-3"
      onClick={() =>
        router.push({
          pathname: '/event',
          query: { eventId: event.id }
        })
      }
    >
      <div className="flex items-center gap-3">
        <Image
          src="/avatar.svg"
          alt="Avatar"
          height={36}
          width={36}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h6>{event.charity.name}</h6>
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
      <h5>{event.name}</h5>
      <div className="flex flex-wrap gap-3">
        <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
        <Venue venue={event.venue} />
      </div>
    </div>
  )
}
