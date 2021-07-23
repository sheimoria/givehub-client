import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import CreateTask from 'components/tasks/CreateTask'
import CreateTaskButton from 'components/tasks/CreateTaskButton'
import Event from 'components/events/Event'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import React from 'react'
import Tasks from 'components/events/Tasks'
import UserTasks from 'components/users/UserTasks'
import VolunteerRequests from 'components/events/VolunteerRequests'
import Volunteers from 'components/events/Volunteers'
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
            <VolunteerRequests  />
          ) : (
            <FriendRequests />
          )}
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      {data && data.event && (
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
