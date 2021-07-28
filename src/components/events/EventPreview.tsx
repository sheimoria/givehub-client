import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'

import EventHeader from './EventHeader'
import Image from 'next/image'
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
            className="pb-5 line-clamp-3"
          >
            {event.description}
          </p>
        </div>
        {event.imageUrl && (
          <div
            className="relative border-l-0 border-r-0 cursor-pointer h-96 bordered"
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
      </article>
    </Transit>
  )
}
