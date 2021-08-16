import {
  EventSnippetFragment,
  TaskHeaderFragment,
  useUserTasksQuery
} from 'generated/graphql'

import EventSnippet from 'components/events/EventSnippet'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

export default function UserEvents() {
  const { data } = useUserTasksQuery()
  const router = useRouter()

  return (
    <Transit as="dl">
      <h5>Your Events</h5>
      <div className="flex flex-col gap-6">
        {data?.viewTasksAssignedToMe?.eventContainers &&
        data.viewTasksAssignedToMe.eventContainers.length > 0 ? (
          data.viewTasksAssignedToMe.eventContainers.map(
            (eventContainer: {
              event: EventSnippetFragment
              tasks: TaskHeaderFragment[]
            }) => (
              <EventSnippet
                key={eventContainer.event.id}
                event={eventContainer.event}
              />
            )
          )
        ) : (
          <p> You have no upcoming events.</p>
        )}
      </div>
    </Transit>
  )
}
