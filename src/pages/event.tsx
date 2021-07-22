import Body from 'components/layout/Body'
import CreateTask from 'components/tasks/CreateTask'
import Event from 'components/events/Event'
import React from 'react'
import Tasks from 'components/events/Tasks'
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
    <Body title="Event" me={me}>
      {data && data.event && (
        <>
          <Event event={data.event} />
          {data.event.adminStatus && (
            <>
              <CreateTask />
              <VolunteerRequests />
              <Tasks />
              <Volunteers />
            </>
          )}
        </>
      )}
    </Body>
  )
})
