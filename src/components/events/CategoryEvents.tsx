import Event from 'components/events/Event'
import useCategoryEventsQuery from 'hooks/useCategoryEventsQuery'
import { useRouter } from 'next/router'

export default function CategoryEvents() {
  const router = useRouter()
  const { data, error } = useCategoryEventsQuery(router.query.categoryId)

  return (
    <>
      {error && <p>{error.message}</p>}
      {data &&
        data.eventsByCategories &&
        data.eventsByCategories.events.map((event) => (
          <Event key={event.id} id={event.id} />
        ))}
    </>
  )
}
