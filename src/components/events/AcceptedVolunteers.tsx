import { AdminApproval, useAcceptedVolunteersQuery } from 'generated/graphql'

import AcceptedVolunteer from './AcceptedVolunteer'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

export default function VolunteerRequests() {
  const router = useRouter()
  const { data } = useAcceptedVolunteersQuery({
    variables: {
      eventIds: [parseInt(router.query.eventId as string)],
      limit: 50
    }
  })
  return (
    <Transit as="dl">
      <h5>Accepted Volunteers</h5>
      <div className="divide">
        {data?.getAcceptedVolunteerRequestListForEvents.items.map((event) => (
          <AcceptedVolunteer
            key={event.user?.id}
            //@ts-ignore
            user={event.user}
          />
        ))}
        {data?.getAcceptedVolunteerRequestListForEvents?.items.length == 0 && (
          <div className="py-3">
            <p>No accepted volunteers yet.</p>
          </div>
        )}
      </div>
    </Transit>
  )
}
