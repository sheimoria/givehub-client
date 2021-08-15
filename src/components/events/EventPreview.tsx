import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'

import EventHeader from './EventHeader'
import Image from 'next/image'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'
import router, { useRouter } from 'next/router'

type Props = {
  event: EventInfoFragment
}

export default function EventPreview({ event }: Props) {
  return (
    <Transit onEveryMount as="article" className="overflow-hidden bordered">
      <section className="px-6">
        <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
        <p
          onClick={() =>
            router.push({ pathname: `/event`, query: { eventId: event.id } })
          }
          className="cursor-pointer line-clamp-3"
        >
          {event.description}
        </p>
      </section>
      {event.imageUrl && (
        <div
          className="relative cursor-pointer h-80"
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
    </Transit>
  )
}
