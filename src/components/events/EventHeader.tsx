import { EventHeaderFragment } from 'generated/graphql'
import Image from 'next/image'
import Datetime from 'components/events/Datetime'
import Venue from 'components/events/Venue'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function EventHeader({ event }: { event: EventHeaderFragment }) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Image
          src="/avatar.svg"
          alt="Avatar"
          height={36}
          width={36}
          className="rounded-full"
        />

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
      <Link
        href={{
          pathname: '/event',
          query: { eventId: event.id }
        }}
      >
        <a className="text-base">{event.name}</a>
      </Link>
      <div className="flex flex-wrap gap-3">
        <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
        <Venue venue={event.venue} />
      </div>
    </div>
  )
}
