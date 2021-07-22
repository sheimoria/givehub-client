import EventHeader from 'components/events/EventHeader'
import Transit from 'components/Transit'
import { EventTaskContainer, useUserTasksQuery } from 'generated/graphql'

export default function UserTasks() {
  const { data } = useUserTasksQuery()
  return (
    <Transit as="article">
      <h5>Your Events</h5>
      {data &&
        data.viewTasksAssignedToMe.eventContainers.map(
          (eventContainer: EventTaskContainer) => (
            <Transit onEveryMount key={eventContainer.event.id} as="article">
              <EventHeader event={eventContainer.event} />
            </Transit>
          )
        )}
    </Transit>
  )
}
