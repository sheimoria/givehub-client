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
      <h4>Your Events</h4>
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
        <div>
          <p> You have no upcoming events.</p>
        </div>
      )}
    </Transit>
  )
}
