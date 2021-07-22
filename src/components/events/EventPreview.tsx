import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'

import { EventInfoFragment } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

export default function EventPreview({
  eventInfo
}: {
  eventInfo: EventInfoFragment
}) {
  const router = useRouter()

  return (
    <Transit onEveryMount>
      <article
        className="transition-transform hover:-translate-y-px"
        onClick={() =>
          router.push({ pathname: `/event`, query: { eventId: eventInfo.id } })
        }
      >
        <div className="flex justify-between">
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
                  query: { charityId: eventInfo.charity.id }
                }}
              >
                <a>{eventInfo.charity.name}</a>
              </Link>
              <p>
                {new Date(parseInt(eventInfo.createdAt)).toLocaleString(
                  'en-US',
                  {
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: 'numeric'
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={{
            pathname: '/event',
            query: { eventId: eventInfo.id }
          }}
        >
          <a className="text-base">{eventInfo.name}</a>
        </Link>

        <div className="flex flex-wrap gap-4">
          <Datetime
            dateStart={eventInfo.dateStart}
            dateEnd={eventInfo.dateEnd}
          />
          <Venue venue={eventInfo.venue} />
        </div>

        <p className="line-clamp-3">{eventInfo.description}</p>
      </article>
    </Transit>
  )
}

export function Datetime({ dateStart, dateEnd }) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon />
      <h6 className="font-normal">
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
      </h6>
    </div>
  )
}

export function Venue({ venue }) {
  return (
    <div className="flex items-center gap-1">
      <LocationMarkerIcon />
      <h6 className="font-normal">{venue}</h6>
    </div>
  )
}
