import {
  EventCardFragment,
  EventHeaderFragmentDoc,
  EventInfoFragmentDoc,
  EventLikesFragmentDoc,
  EventRequestsFragmentDoc
} from 'generated/graphql'

import EventHeader from './EventHeader'
import Image from 'next/image'
import LikeEvent from 'components/events/LikeEvent'
import RequestEvent from './RequestEvent'
import ShareEvent from './ShareEventButton'
import Transit from 'components/Transit'
import UpdateDeleteEventButton from 'components/events/UpdateDeleteEventButton'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'

type EventProps = {
  event: EventCardFragment
  lineclamp?: boolean
}

export default function EventCard({ event, lineclamp }: EventProps) {
  const router = useRouter()
  return (
    <Transit onEveryMount as="article">
      <div className="flex justify-between gap-4">
        <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
        <div className="flex gap-2">
          {event.adminStatus && (
            <UpdateDeleteEventButton
              event={filter(EventInfoFragmentDoc, event)}
            />
          )}
          <ShareEvent event={filter(EventInfoFragmentDoc, event)} />
        </div>
      </div>
      <p
        onClick={() =>
          router.push({ pathname: '/event', query: { eventId: event.id } })
        }
        className={`${lineclamp ? 'line-clamp-3' : ''} cursor-pointer`}
      >
        {event.description}
      </p>
      {event.imageUrl && (
        <div
          className="relative overflow-hidden rounded-md cursor-pointer h-80"
          onClick={() =>
            router.push({ pathname: '/event', query: { eventId: event.id } })
          }
        >
          <Image
            src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${event.imageUrl}`}
            alt="Event image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <LikeEvent event={filter(EventLikesFragmentDoc, event)} />
        <RequestEvent event={filter(EventRequestsFragmentDoc, event)} />
      </div>
    </Transit>
  )
}
