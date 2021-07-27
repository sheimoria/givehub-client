import Datetime from 'components/events/Datetime'
import { EventSnippetFragment } from 'generated/graphql'
import Link from 'next/link'
import Venue from 'components/events/Venue'

export default function EventSnippet({
  event
}: {
  event: EventSnippetFragment
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h6>{event.name}</h6>
        <p>{event.charity.name}</p>
      </div>
      <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
      <Venue venue={event.venue} />
    </div>
  )
}
