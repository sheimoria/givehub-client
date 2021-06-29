import Event from 'components/events/Event'
import useEventsQuery from 'hooks/useEventsQuery'

export default function LatestEvents() {
  const { data, loading, error } = useEventsQuery(3, null, false, false)

  return (
    <section className={(loading && 'bg-opacity-50 animate-pulse') || ''}>
      {error && <p>{error.message}</p>}
      <h5>Latest Events</h5>
      {data &&
        data.events &&
        data.events.events.map((event) => (
          <Event key={event.id} id={event.id} />
        ))}
    </section>
  )
}
