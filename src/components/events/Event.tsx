import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import {
  EventCardFragment,
  EventInfoFragmentDoc,
  EventLikesFragmentDoc,
  EventRequestsFragmentDoc
} from 'generated/graphql'

import Image from 'next/image'
import LikeEvent from 'components/events/LikeEvent'
import Link from 'next/link'
import RequestEvent from './RequestEvent'
import ShareEvent from './ShareEvent'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'

type EventProps = {
  event: EventCardFragment
  lineclamp?: boolean
}

export default function Event({ event, lineclamp }: EventProps) {
  return (
    <Transit onEveryMount>
      <article>
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
          {/*  <EditEvent event={event} /> */}
          <ShareEvent eventInfo={filter(EventInfoFragmentDoc, event)} />
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

        <p className={lineclamp ? 'line-clamp-3' : ''}>{event.description}</p>
        <div className="flex items-center gap-4">
          <LikeEvent likeEvent={filter(EventLikesFragmentDoc, event)} />
          <RequestEvent
            requestEvent={filter(EventRequestsFragmentDoc, event)}
          />
        </div>
      </article>
    </Transit>
  )
}

export function Datetime({ dateStart, dateEnd }) {
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

export function Venue({ venue }) {
  return (
    <div className="flex items-center gap-1">
      <LocationMarkerIcon />
      <p>{venue}</p>
    </div>
  )
}
