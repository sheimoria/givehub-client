import { AdminApproval, useVolunteerRequestsQuery } from 'generated/graphql'

import Transit from 'components/Transit'
import VolunteerRequest from './VolunteerRequest'
import { useRouter } from 'next/router'

export default function UnassignedVolunteers() {
  const router = useRouter()
  const { data } = useVolunteerRequestsQuery({
    variables: { eventIds: [parseInt(router.query.eventId as string)] }
  })
  return (
    <Transit as="dl">
      <h5>Unassigned Volunteers</h5>
      <div className="divide">
        {data?.getVolunteerRequestListForEvents?.items
          .filter(
            (eventVolunteer) =>
              eventVolunteer.adminapproval === AdminApproval.Approved
          )
          .map((eventVolunteer) => (
            <VolunteerRequest
              key={eventVolunteer.user?.id}
              //@ts-ignore
              user={eventVolunteer.user}
            />
          ))}
        {data?.getVolunteerRequestListForEvents?.items.filter(
          (eventVolunteer) =>
            eventVolunteer.adminapproval == AdminApproval.Pending
        ).length == 0 && (
          <div className="py-3">
            <p>No pending volunteer requests.</p>
          </div>
        )}
      </div>
    </Transit>
  )
}
