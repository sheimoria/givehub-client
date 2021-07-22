import { EventHeaderFragment } from 'generated/graphql'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/outline'

export default function EventHeader({ event }: { event: EventHeaderFragment }) {
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
      <div className="flex flex-wrap gap-4">
        <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
        <Venue venue={event.venue} />
      </div>
    </div>
  )
}

type DatetimeProps = {
  dateStart: string
  dateEnd: string
}

export function Datetime({ dateStart, dateEnd }: DatetimeProps) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon />
      <p>
        {new Date(parseInt(dateStart)).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric'
        })}{' '}
        —{' '}
        {new Date(parseInt(dateEnd)).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric'
        })}
      </p>
    </div>
  )
}

export function Venue({ venue }: { venue: string }) {
  return (
    <div className="flex items-center gap-1">
      <LocationMarkerIcon />
      <p>{venue}</p>
    </div>
  )
}
