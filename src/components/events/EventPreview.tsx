import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'
import { Image, Transformation } from 'cloudinary-react'

import EventHeader from './EventHeader'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'

type Props = {
  event: EventInfoFragment
}

export default function EventPreview({ event }: Props) {
  const router = useRouter()

  return (
    <Transit onEveryMount>
      <article className="px-0 pb-0 mb-3 border-l-0 border-r-0 rounded-none clickable-float">
        <div className="flex flex-col gap-3 px-5">
          <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
          <p
            onClick={() =>
              router.push({ pathname: `/event`, query: { eventId: event.id } })
            }
            className="line-clamp-3"
          >
            {event.description}
          </p>
        </div>
        {event.imageUrl && (
          <div
            className="border-l-0 border-r-0 cursor-pointer bordered"
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
      </article>
    </Transit>
  )
}
