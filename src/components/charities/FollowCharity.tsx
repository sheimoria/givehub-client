import { UserAddIcon, UsersIcon } from '@heroicons/react/outline'
import {
  CharityDocument,
  Maybe,
  useFollowCharityMutation
} from 'generated/graphql'

import router from 'next/router'

export default function FollowCharity({
  followStatus
}: {
  followStatus: Maybe<number> | undefined
}) {
  const [follow] = useFollowCharityMutation({
    variables: { charityId: parseInt(router.query.charityId as string) },
    refetchQueries: [
      {
        query: CharityDocument,
        variables: { charityId: parseInt(router.query.charityId as string) }
      }
    ]
  })

  return followStatus === 1 ? (
    <button onClick={() => follow()} className="btn-secondary">
      <UsersIcon />
      Following
    </button>
  ) : (
    <button onClick={() => follow()} className="btn-primary">
      <UserAddIcon />
      Follow
    </button>
  )
}
