import {
  AdminApproval,
  EventRequestsFragment,
  useRequestEventMutation
} from 'generated/graphql'

import { HandIcon as HandIconHollow } from '@heroicons/react/outline'

export default function RequestEvent({
  event
}: {
  event: EventRequestsFragment
}) {
  const [request] = useRequestEventMutation({
    variables: { eventId: event.id }
  })

  return (
    <div className="flex gap-2">
      {event.approvalStatus === AdminApproval.Approved ? (
        <button className="px-3 py-1 text-xs pointer-events-none button-outline">
          RSVP Approved
        </button>
      ) : event.approvalStatus === AdminApproval.Pending ? (
        <button
          onClick={() => request()}
          className="px-3 py-1 text-xs button-outline"
        >
          RSVP Pending
        </button>
      ) : event.approvalStatus === AdminApproval.Rejected ? (
        <button className="px-3 py-1 text-xs pointer-events-none button-outline">
          RSVP Rejected
        </button>
      ) : (
        <HandIconHollow
          onClick={() => request()}
          className="transition-transform hover:scale-110"
        />
      )}
      <p>{event.volunteerNumber}</p>
    </div>
  )
}
