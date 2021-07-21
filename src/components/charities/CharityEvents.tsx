import Event from 'components/events/Event'

export default function CharityEvents({ events }) {
  return events.map((event) => <Event key={event.id} event={event} />)
}
