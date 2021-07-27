import {
  EventSnippetFragment,
  TaskHeaderFragment,
  useUserTasksQuery
} from 'generated/graphql'

import EventSnippet from 'components/Events/EventSnippet'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

export default function UserEvents() {
  const { data } = useUserTasksQuery()
  const router = useRouter()

  return (
    <Transit as="dl" className="gap-3 pb-5">
      <h5>Your Events</h5>
      {data?.viewTasksAssignedToMe?.eventContainers &&
      data.viewTasksAssignedToMe.eventContainers.length > 0 ? (
        data.viewTasksAssignedToMe.eventContainers.map(
          (eventContainer: {
            event: EventSnippetFragment
            tasks: TaskHeaderFragment[]
          }) => (
            <Transit
              key={eventContainer.event.id}
              as="article"
              className="clickable-float"
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
        )
      ) : (
        <div>
          <p> You have no upcoming events.</p>
        </div>
      )}
    </Transit>
  )
}
