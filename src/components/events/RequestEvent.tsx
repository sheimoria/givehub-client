import {
  EventRequestsFragment,
  useRequestEventMutation
} from 'generated/graphql'

import { HandIcon as HandIconHollow } from '@heroicons/react/outline'
import React from 'react'

export default function RequestEvent({
  requestEvent
}: {
  requestEvent: EventRequestsFragment
}) {
  const [request] = useRequestEventMutation()

  switch (requestEvent.approvalStatus) {
    case 'PENDING':
      return <p>Pending</p>
    case 'APPROVED':
      return <p>Approved</p>
    case 'REJECTED':
      return <p>Rejected</p>
    default:
      return (
        <HandIconHollow
          className="text-gray-600 transition-transform hover:scale-110 dark:text-gray-300"
          onClick={() =>
            request({
              variables: { eventId: requestEvent.id }
            })
          }
        />
      )
  }
}
