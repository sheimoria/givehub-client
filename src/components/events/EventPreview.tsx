import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'

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
      <article className="mx-5 mb-3 rounded-lg clickable-float">
        <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
        <p
          onClick={() =>
            router.push({ pathname: `/event`, query: { eventId: event.id } })
          }
          className="line-clamp-3"
        >
          {event.description}
        </p>
      </article>
    </Transit>
  )
}
