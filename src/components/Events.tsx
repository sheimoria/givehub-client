import Event from 'components/Event'
import { useEventsQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function Events() {
  const router = useRouter()
  const { data, loading, error } = useEventsQuery({
    variables: {
      limit: 10,
      categories: isNaN(router.query.view)
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        : [parseInt(router.query.view as string)],
      sortByLikes: router.query.view === 'trending',
      sortByUpcoming: router.query.view === 'upcoming'
    }
  })

  if (error) return <p>{error.message}</p>
  if (loading) return <div className="animate-spin" />

  return (
    <>
      {data.searchEvents.items.map((event) => (
        <Event key={event.id} event={event} lineclamp={true} />
      ))}
    </>
  )
}
