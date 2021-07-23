import {
  FriendRequestsDocument,
  UserHeaderFragment,
  VolunteerRequestsDocument,
  useAcceptVolunteerMutation
} from 'generated/graphql'

import Link from 'next/link'
import Picture from 'components/Picture'
import { useRouter } from 'next/router'

export default function VolunteerRequest({
  user
}: {
  user: UserHeaderFragment
}) {
  const [acceptVolunteer] = useAcceptVolunteerMutation()
  const router = useRouter()

  return (
    <div className="flex flex-wrap justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Picture size={36} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/user',
              query: { userId: user.id }
            }}
          >
            <a className="truncate">
              {user.profile?.firstName} {user.profile?.lastName}
            </a>
          </Link>
          <p className="truncate">@{user.username}</p>
        </div>
      </div>
      <div className="flex items-center flex-none gap-2">
        <button
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
          className="px-3 py-1 button-outline"
        >
          Reject
        </button>
        <button
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
        >
          Accept
        </button>
      </div>
    </div>
  )
}
