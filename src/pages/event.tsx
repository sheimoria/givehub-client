import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import CreateTaskButton from 'components/Tasks/CreateTaskButton'
import Event from 'components/Events/EventCard'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import Tasks from 'components/Events/EventTasks'
import UnassignedVolunteers from 'components/Events/ApprovedVolunteers'
import UserTasks from 'components/Users/YourEvents'
import VolunteerRequests from 'components/Events/VolunteerRequests'
import Volunteers from 'components/Events/Volunteers'
import { useEventQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

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
              <UnassignedVolunteers />
            </>
          ) : (
            <>
              <FriendRequests />
              <UserTasks />
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
              <CreateTaskButton />
              <Tasks />
              <Volunteers />
            </>
          )}
        </>
      )}
    </Body>
  )
})
