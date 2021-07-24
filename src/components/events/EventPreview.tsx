import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'
import EventHeader from './EventHeader'
import { filter } from 'graphql-anywhere'
import classNames from 'utils/classNames'

type Props = {
  event: EventInfoFragment
  fill?: boolean
}

export default function EventPreview({ event, fill }: Props) {
  const router = useRouter()

  return (
    <Transit onEveryMount>
      <article
        className={classNames(
          fill ? 'mb-3 border-l-0 border-r-0 rounded-none' : '',
          'clickable-float'
        )}
      >
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
