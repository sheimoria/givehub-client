import { useEventsQuery, usePostsQuery } from 'generated/graphql'

import Event from 'components/events/EventCard'
import { useRouter } from 'next/router'

export default function Events() {
  const router = useRouter()
  const { data } = useEventsQuery({
    variables: {
      limit: 10,
      // @ts-ignore
      categories: isNaN(router.query.view)
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        : [parseInt(router.query.view as string)],
      sortByLikes: router.query.view === 'trending',
      sortByUpcoming: router.query.view === 'upcoming'
    }
  })

  return (
    <>
      {data &&
        data.searchEvents.items.map((event) => (
          <Event key={event.id} event={event} lineclamp={true} />
        ))}
    </>
  )
}
