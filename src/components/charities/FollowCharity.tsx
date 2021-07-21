import { CharityDocument, useFollowCharityMutation } from 'generated/graphql'

import router from 'next/router'

export default function FollowCharity({
  followStatus
}: {
  followStatus: number
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
    <button
      onClick={() => follow()}
      className="rounded-button-outline button-highlight"
    >
      Following
    </button>
  ) : (
    <button
      onClick={() => follow()}
      className="rounded-button-solid button-highlight"
    >
      Follow
    </button>
  )
}
