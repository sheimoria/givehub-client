import AcceptedVolunteers from 'components/events/UnassignedVolunteers'
import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import CreateTaskButton from 'components/tasks/CreateTaskButton'
import Event from 'components/events/EventCard'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import Tasks from 'components/events/EventTasks'
import UserEvents from 'components/users/UserEvents'
import ViewTelegramButton from 'components/events/ViewTelegramButton'
import VolunteerRequests from 'components/events/VolunteerRequests'
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
              <AcceptedVolunteers />
            </>
          ) : (
            <>
              <FriendRequests />
              <UserEvents />
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
          {data.event.adminStatus && data.event.currentEventVolunteers && (
            <>
              <div className="flex flex-col gap-4 px-6 sm:flex-row sm:px-0">
                <CreateTaskButton />
                <ViewTelegramButton
                  volunteers={data.event.currentEventVolunteers}
                />
              </div>

              <Tasks />
            </>
          )}
        </>
      )}
    </Body>
  )
})
