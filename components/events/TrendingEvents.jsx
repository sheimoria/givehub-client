import Event from 'components/events/Event'
import useEventsQuery from 'hooks/useEventsQuery'

export default function TrendingEvents() {
  const { data, loading, error } = useEventsQuery(3, null, true)

  return (
    <section className={(loading && 'bg-opacity-50 animate-pulse') || ''}>
      {error && <p>{error.message}</p>}
      <h5>Trending Events</h5>
      {data &&
        data.events &&
        data.events.events.map((event) => (
          <Event key={event.id} id={event.id} truncate />
        ))}
    </section>
  )
}
