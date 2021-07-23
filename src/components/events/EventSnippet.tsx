import { EventSnippetFragment } from 'generated/graphql'
import Link from 'next/link'
import Datetime from 'components/events/Datetime'
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
        <Link
          href={{
            pathname: '/charity',
            query: { charityId: event.charity.id }
          }}
        >
          <a className="font-normal">{event.charity.name}</a>
        </Link>
      </div>
      <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
      <Venue venue={event.venue} />
    </div>
  )
}
