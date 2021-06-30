import Event from 'components/events/Event'
import useEventsQuery from 'hooks/useEventsQuery'

export default function TrendingEvents() {
  const { data, loading, error } = useEventsQuery(3, null, true, false)

  return (
    <section className={loading ? 'bg-opacity-50 animate-pulse' : undefined}>
      {error && <p>{error.message}</p>}
      <h5 className="pt-6 -mb-4">Trending Events</h5>
      {data && data.events && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.events.events.map((event) => (
            <Event key={event.id} id={event.id} truncate />
          ))}
        </div>
      )}
    </section>
  )
}
