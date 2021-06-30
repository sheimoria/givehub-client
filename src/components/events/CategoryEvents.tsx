import Event from 'components/events/Event'
import useCategoryEventsQuery from 'hooks/useCategoryEventsQuery'
import { useRouter } from 'next/router'

export default function CategoryEvents() {
  const router = useRouter()
  const { data, loading, error } = useCategoryEventsQuery(
    router.query.categoryId
  )

  return (
    <section className={loading && 'bg-opacity-50 animate-pulse'}>
      {error && <p>{error.message}</p>}
      {data &&
        data.events &&
        data.events.events.map((event) => (
          <Event key={event.id} id={event.id} />
        ))}
    </section>
  )
}
