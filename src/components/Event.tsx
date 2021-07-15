import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon
} from '@heroicons/react/solid'

import Edit from 'components/Edit'
import { EventFragment } from 'generated/graphql'
import Image from 'next/image'
import LikeEvent from 'components/LikeEvent'
import Link from 'next/link'
import React from 'react'
import RequestEvent from './RequestEvent'

export default function Event({ event }: { event: EventFragment }) {
  return (
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
        <Edit event={event} />
      </div>

      <Link
        href={{
          pathname: '/event',
          query: { eventId: event.id }
        }}
      >
        <a className="text-lg">{event.name}</a>
      </Link>

      <div className="flex flex-wrap gap-4">
        <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
        <Venue venue={event.venue} />
      </div>

      <p className="line-clamp-4">{event.description}</p>
      <div className="flex gap-4">
        <LikeEvent
          likeEvent={{
            id: event.id,
            voteStatus: event.voteStatus,
            likeNumber: event.likeNumber
          }}
        />
        <RequestEvent
          requestEvent={{ id: event.id, approvalStatus: event.approvalStatus }}
        />
      </div>
    </article>
  )
}

export function Datetime({ dateStart, dateEnd }) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="w-5 h-5 text-gray-400" />
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
      <LocationMarkerIcon className="w-5 h-5 text-gray-400" />
      <h6 className="font-normal">{venue}</h6>
    </div>
  )
}

export function RequestNumber({ requestNumber }) {
  return (
    <div className="flex items-center gap-1">
      <UsersIcon className="w-5 h-5 text-gray-400" />
      <p className="font-medium">{requestNumber}</p>
    </div>
  )
}
