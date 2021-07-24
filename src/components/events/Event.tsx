import {
  EventCardFragment,
  EventHeaderFragmentDoc,
  EventInfoFragmentDoc,
  EventLikesFragmentDoc,
  EventRequestsFragmentDoc
} from 'generated/graphql'
import EventHeader from './EventHeader'
import LikeEvent from 'components/events/LikeEvent'
import RequestEvent from './RequestEvent'
import ShareEvent from './ShareEvent'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'
import UpdateEventButton from 'components/charities/UpdateEventButton'
import { Image, Transformation } from 'cloudinary-react'
import { useRouter } from 'next/router'

type EventProps = {
  event: EventCardFragment
  lineclamp?: boolean
}

export default function Event({ event, lineclamp }: EventProps) {
  const router = useRouter()
  return (
    <Transit onEveryMount>
      <article className="gap-0 p-0">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3">
          <div className="flex justify-between gap-3">
            <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
            <div className="flex gap-2">
              {event.adminStatus && (
                <UpdateEventButton
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
          {event.imageUrl && (
            <div className="mb-3 bordered">
              <Image
                cloudName="givehub"
                secure
                upload_preset="eventImages"
                publicId={event.imageUrl}
                alt="Event image"
              >
                <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 px-5 pb-5">
          <LikeEvent likeEvent={filter(EventLikesFragmentDoc, event)} />
          <RequestEvent event={filter(EventRequestsFragmentDoc, event)} />
        </div>
      </article>
    </Transit>
  )
}
