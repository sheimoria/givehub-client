import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'

import { EventHeaderFragmentDoc, EventInfoFragment } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'
import EventHeader from './EventHeader'
import { filter } from 'graphql-anywhere'

export default function EventPreview({
  eventInfo
}: {
  eventInfo: EventInfoFragment
}) {
  const router = useRouter()

  return (
    <Transit onEveryMount>
      <article
        className="transition-transform hover:-translate-y-px"
        onClick={() =>
          router.push({ pathname: `/event`, query: { eventId: eventInfo.id } })
        }
      >
        <EventHeader eventHeader={filter(EventHeaderFragmentDoc, eventInfo)} />
        <p className="line-clamp-3">{eventInfo.description}</p>
      </article>
    </Transit>
  )
}
