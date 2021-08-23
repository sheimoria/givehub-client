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
    <div className="flex items-center gap-2">
      {event.adminStatus ? (
        <button className="px-2 py-1 text-xs font-medium transition-colors rounded bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-900 dark:hover:bg-rose-800 dark:text-rose-400 dark:hover:text-rose-300">
          Admin
        </button>
      ) : event.approvalStatus === AdminApproval.Approved ? (
        <button className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded pointer-events-none dark:bg-green-900 dark:text-green-400">
          RSVP Approved
        </button>
      ) : event.approvalStatus === AdminApproval.Pending ? (
        <button
          onClick={() => request()}
          className="px-2 py-1 text-xs font-medium transition-colors rounded bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-900 dark:hover:bg-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
        >
          RSVP Pending
        </button>
      ) : event.approvalStatus === AdminApproval.Rejected ? (
        <button className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded pointer-events-none dark:bg-red-900 dark:text-red-400">
          RSVP Rejected
        </button>
      ) : (
        <HandIconHollow
          onClick={() => request()}
          className="text-gray-500 transition-colors cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        />
      )}
      <p>
        {event.volunteerNumber}{' '}
        {event.volunteerNumber === 1 ? 'Volunteer' : 'Volunteers'}
      </p>
    </div>
  )
}
