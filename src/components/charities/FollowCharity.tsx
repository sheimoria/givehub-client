import { UserGroupIcon } from '@heroicons/react/solid'
import {
  CharityDocument,
  FollowCharityFragment,
  useFollowCharityMutation
} from 'generated/graphql'

export default function FollowCharity({
  followCharity
}: {
  followCharity: FollowCharityFragment
}) {
  const [follow] = useFollowCharityMutation({
    variables: { charityId: followCharity.id },
    refetchQueries: [
      { query: CharityDocument, variables: { charityId: followCharity.id } }
    ]
  })

  return (
    <>
      {/* Followers */}
      <div className="flex items-center gap-2">
        <UserGroupIcon />
        <p>{followCharity.followNumber} followers</p>
      </div>
      {followCharity.followStatus === 1 ? (
        <button onClick={() => follow()} className="rounded-button-outline">
          Following
        </button>
      ) : (
        <button onClick={() => follow()} className="rounded-button-solid">
          Follow
        </button>
      )}
    </>
  )
}
