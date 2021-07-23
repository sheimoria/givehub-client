import {
  AdminApproval,
  EventRequestsFragment,
  useRequestEventMutation
} from 'generated/graphql'

import { HandIcon as HandIconHollow } from '@heroicons/react/outline'

export default function RequestEvent({
  requestEvent
}: {
  requestEvent: EventRequestsFragment
}) {
  const [request] = useRequestEventMutation({
    variables: { eventId: requestEvent.id }
  })

  switch (requestEvent.approvalStatus) {
    case AdminApproval.Pending:
      return (
        <button className="text-xs pointer-events-none button-outline">
          RSVP Pending
        </button>
      )
    case AdminApproval.Approved:
      return (
        <button className="text-xs pointer-events-none button-outline">
          RSVP Approved
        </button>
      )
    case AdminApproval.Rejected:
      return (
        <button className="text-xs pointer-events-none button-outline">
          RSVP Rejected
        </button>
      )
    default:
      return (
        <HandIconHollow
          className="transition-transform hover:scale-110"
          onClick={() => request()}
        />
      )
  }
}
