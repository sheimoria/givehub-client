import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'
import EventHeader from './EventHeader'
import { filter } from 'graphql-anywhere'

export default function EventPreview({ event }: { event: EventInfoFragment }) {
  const router = useRouter()

  return (
    <Transit onEveryMount>
      <article
        className="transition-transform hover:-translate-y-px"
        onClick={() =>
          router.push({ pathname: `/event`, query: { eventId: event.id } })
        }
      >
        <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
        <p className="line-clamp-3">{event.description}</p>
      </article>
    </Transit>
  )
}
