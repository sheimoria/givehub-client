import EventSnippet from 'components/events/EventSnippet'
import Transit from 'components/Transit'
import {
  EventSnippetFragment,
  TaskHeaderFragment,
  useUserTasksQuery
} from 'generated/graphql'

export default function UserTasks() {
  const { data } = useUserTasksQuery()
  return (
    <Transit as="article">
      <h5>Your Events</h5>
      {data &&
        data.viewTasksAssignedToMe.eventContainers.map(
          (eventContainer: {
            event: EventSnippetFragment
            tasks: TaskHeaderFragment[]
          }) => (
            <Transit key={eventContainer.event.id} as="article">
              <EventSnippet event={eventContainer.event} />
            </Transit>
          )
        )}
    </Transit>
  )
}
