import {
  UserHeaderFragment,
  VolunteerRequestsDocument,
  useAcceptVolunteerMutation
} from 'generated/graphql'

import Picture from 'components/Picture'
import { useRouter } from 'next/router'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'

export default function VolunteerRequest({
  user
}: {
  user: UserHeaderFragment
}) {
  const [acceptVolunteer] = useAcceptVolunteerMutation()
  const router = useRouter()

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        onClick={() =>
          router.push({
            pathname: '/user',
            query: { userId: user.id }
          })
        }
        className="flex items-center gap-4 cursor-pointer"
      >
        <Picture pictureId={user.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="transition-colors line-clamp-1 hover:text-gray-800 dark:hover:text-gray-100">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <span className="text-xs line-clamp-1 text-rose-600">
            @{user.username}
          </span>
        </div>
      </div>
      <div className="flex items-center flex-none gap-2">
        <XCircleIcon
          onClick={() =>
            acceptVolunteer({
              variables: {
                eventId: parseInt(router.query.eventId as string),
                volunteerId: user.id,
                accept: false
              },
              refetchQueries: [
                {
                  query: VolunteerRequestsDocument,
                  variables: {
                    eventIds: [parseInt(router.query.eventId as string)]
                  }
                }
              ]
            })
          }
          className="w-7 h-7 clickable"
        />
        <CheckCircleIcon
          onClick={() =>
            acceptVolunteer({
              variables: {
                eventId: parseInt(router.query.eventId as string),
                volunteerId: user.id,
                accept: true
              },
              refetchQueries: [
                {
                  query: VolunteerRequestsDocument,
                  variables: {
                    eventIds: [parseInt(router.query.eventId as string)]
                  }
                }
              ]
            })
          }
          className="transition-colors cursor-pointer w-7 h-7 text-rose-600 dark:hover:text-rose-500 hover:text-rose-700"
        />
      </div>
    </div>
  )
}
