import AcceptedVolunteers from 'components/events/AcceptedVolunteers'
import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import CreateTaskButton from 'components/tasks/CreateTaskButton'
import Event from 'components/events/EventCard'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import Tasks from 'components/events/EventTasks'
import VolunteerRequests from 'components/events/VolunteerRequests'
import YourEvents from 'components/users/YourEvents'
import { useEventQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import CreateTelegramButton from 'components/events/CreateTelegramButton'

export default withAuth(function ViewEvent({ me }) {
  const router = useRouter()
  const { data } = useEventQuery({
    variables: { id: parseInt(router.query.eventId as string) }
  })

  return (
    <Body
      title="Event"
      me={me}
      aside={
        <>
          {data?.event?.adminStatus ? (
            <>
              <VolunteerRequests />
              <AcceptedVolunteers />
            </>
          ) : (
            <>
              <FriendRequests />
              <YourEvents />
              <PeopleToFollow />
              <CharitiesToFollow />
            </>
          )}
        </>
      }
    >
      {data?.event && (
        <>
          <Event event={data.event} />
          {data.event.adminStatus && (
            <>
              <div className="flex gap-3">
                <CreateTaskButton />
                <CreateTelegramButton />
              </div>

              <Tasks />
            </>
          )}
        </>
      )}
    </Body>
  )
})
