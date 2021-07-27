import Transit from 'components/Transit'
import VolunteerRequest from 'components/events/VolunteerRequest'
import { useRouter } from 'next/router'
import { useVolunteerRequestsQuery } from 'generated/graphql'

export default function VolunteerRequests() {
  const router = useRouter()
  const { data } = useVolunteerRequestsQuery({
    variables: {
      eventIds: [parseInt(router.query.eventId as string)],
      limit: 50
    }
  })
  return (
    <Transit as="dl">
      <h5>Volunteer Requests</h5>
      <div className="divide">
        {data?.getPendingVolunteerRequestForEvents?.items.map((event) => (
          <VolunteerRequest
            key={event.user?.id}
            //@ts-ignore
            user={event.user}
          />
        ))}
        {data?.getPendingVolunteerRequestForEvents?.items.length == 0 && (
          <div className="py-3">
            <p>No pending volunteer requests.</p>
          </div>
        )}
      </div>
    </Transit>
  )
}
