import EventSnippet from 'components/events/EventSnippet'
import Transit from 'components/Transit'
import {
  EventSnippetFragment,
  TaskHeaderFragment,
  useUserTasksQuery
} from 'generated/graphql'
import { useRouter } from 'next/router'

export default function UserTasks() {
  const { data } = useUserTasksQuery()
  const router = useRouter()

  return (
    <Transit as="article">
      <h5>Your Events</h5>
      {data &&
        data.viewTasksAssignedToMe.eventContainers.map(
          (eventContainer: {
            event: EventSnippetFragment
            tasks: TaskHeaderFragment[]
          }) => (
            <Transit
              key={eventContainer.event.id}
              as="article"
              className="transition-transform hover:-translate-y-px"
              onClick={() =>
                router.push({
                  pathname: `/event`,
                  query: { eventId: eventContainer.event.id }
                })
              }
            >
              <EventSnippet event={eventContainer.event} />
            </Transit>
          )
        )}
    </Transit>
  )
}
