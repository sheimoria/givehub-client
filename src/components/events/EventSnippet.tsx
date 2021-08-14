import Datetime from 'components/events/Datetime'
import { EventSnippetFragment } from 'generated/graphql'
import Venue from 'components/events/Venue'
import router from 'next/router'

export default function EventSnippet({
  event
}: {
  event: EventSnippetFragment
}) {
  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/event`,
          query: { eventId: event.id }
        })
      }
      className="flex flex-col gap-2 cursor-pointer"
    >
      <div className="flex flex-col">
        <h5 className="truncate">{event.name}</h5>
        <p>{event.charity.name}</p>
      </div>
      <Datetime dateStart={event.dateStart} dateEnd={event.dateEnd} />
      <Venue venue={event.venue} />
    </div>
  )
}
