import Event from 'components/events/Event'
import useEventsQuery from 'hooks/useEventsQuery'

export default function LatestEvents() {
  const { data, loading, error } = useEventsQuery(3, null, false, false)

  return (
    <>
      {error && <p>{error.message}</p>}
      {data &&
        data.events &&
        data.events.events.map((event) => (
          <Event key={event.id} id={event.id} />
        ))}
    </>
  )
}
