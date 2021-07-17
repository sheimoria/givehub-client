import Body from 'components/layout/Body'
import Event from 'components/Event'
import React from 'react'
import VolunteerRequests from 'components/VolunteerRequests'
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
      {data && (
        <>
          <Event event={data.event} />
          {data.event.adminStatus && <VolunteerRequests />}
        </>
      )}
    </Body>
  )
})
