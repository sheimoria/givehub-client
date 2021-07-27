import Event from 'components/Events/EventCard'
import { EventCardFragment } from 'generated/graphql'

export default function CharityEvents({
  events
}: {
  events: EventCardFragment[]
}) {
  return (
    <>
      {events.map((event) => (
        <Event key={event.id} event={event} lineclamp />
      ))}
    </>
  )
}
