import Transit from 'components/Transit'
import UnassignedVolunteer from './UnassignedVolunteer'
import { useEventTasksQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function UnassignedVolunteers() {
  const router = useRouter()
  const { data } = useEventTasksQuery({
    variables: {
      eventId: parseInt(router.query.eventId as string)
    }
  })

  return (
    <Transit as="dl">
      <h5>Unassigned Volunteers</h5>
      {data?.event?.unassignedVolunteers?.map((user) => (
        <UnassignedVolunteer
          key={user.id}
          user={user}
          tasks={data?.event?.eventTasks}
        />
      ))}
      {data?.event?.unassignedVolunteers?.length == 0 && (
        <p>No unassigned volunteers.</p>
      )}
    </Transit>
  )
}
