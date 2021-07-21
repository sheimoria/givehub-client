import { useRouter } from 'next/router'
import { useVolunteerRequestsQuery } from 'generated/graphql'

export default function VolunteerRequests() {
  const router = useRouter()
  const { data } = useVolunteerRequestsQuery({
    variables: { eventIds: [parseInt(router.query.eventId as string)] }
  })

  return data ? (
    <article>
      <h5>Volunteer Requests</h5>
      {data.getVolunteerRequestListForEvents.items.map((request) => (
        <div
          key={request.user.id}
          className="flex items-center justify-between gap-4"
        >
          <p>
            {request.user.profile?.firstName} {request.user.profile?.lastName}
          </p>
          {request.adminapproval === 'PENDING' ? (
            <div className="flex items-center gap-2">
              <button className="rounded-button-outline">Reject</button>
              <button className="rounded-button-solid">Accept</button>
            </div>
          ) : request.adminapproval === 'APPROVED' ? (
            <a>Approved</a>
          ) : (
            <a>Rejected</a>
          )}
        </div>
      ))}
    </article>
  ) : null
}
