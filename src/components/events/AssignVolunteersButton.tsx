import { PlusIcon } from '@heroicons/react/outline'
import { useAcceptedVolunteersQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AssignVolunteersButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data } = useAcceptedVolunteersQuery({
    variables: {
      eventIds: [parseInt(router.query.eventId as string)],
      limit: 50
    }
  })

  return (
    <>
      <button className="gap-1 px-3 py-1 text-xs button-outline">
        <PlusIcon className="w-4 h-4 text-rose-600 dark:text-rose-600 hover:text-rose-700 dark:hover:text-rose-700" />
        Assign Volunteers
      </button>
      {/* {data && isOpen && (
        <AssignVolunteersModal
          setIsOpen={setIsOpen}
          event={data.getAcceptedVolunteerRequestListForEvents.items}
        />
      )} */}
    </>
  )
}
