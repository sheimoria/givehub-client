import {
  EventCardFragment,
  EventHeaderFragmentDoc,
  EventInfoFragmentDoc,
  EventLikesFragmentDoc,
  EventRequestsFragmentDoc
} from 'generated/graphql'
import { Image, Transformation } from 'cloudinary-react'

import EventHeader from './EventHeader'
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
    <Transit onEveryMount>
      <article className="gap-0 p-0">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3">
          <div className="flex justify-between gap-3">
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
          <div
            onClick={() =>
              router.push({ pathname: '/event', query: { eventId: event.id } })
            }
            className="cursor-pointer"
          >
            <p className={lineclamp ? 'line-clamp-3' : ''}>
              {event.description}
            </p>
          </div>
        </div>
        {event.imageUrl && (
          <div
            className="mb-3 border-l-0 border-r-0 cursor-pointer bordered"
            onClick={() =>
              router.push({ pathname: '/event', query: { eventId: event.id } })
            }
          >
            <Image
              cloudName="givehub"
              secure
              upload_preset="eventImages"
              publicId={event.imageUrl}
              alt="Event Image"
              dpr="auto"
              responsive
              crop="scale"
              responsiveUseBreakpoints="true"
              className="w-full"
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>
        )}
        <div className="flex items-center gap-3 px-5 pb-5">
          <LikeEvent likeEvent={filter(EventLikesFragmentDoc, event)} />
          <RequestEvent event={filter(EventRequestsFragmentDoc, event)} />
        </div>
      </article>
    </Transit>
  )
}
