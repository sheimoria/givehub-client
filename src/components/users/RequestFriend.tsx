import {
  FriendRequestStatus,
  Maybe,
  UserDocument,
  useRequestFriendMutation
} from 'generated/graphql'

import router from 'next/router'

export default function RequestFriend({
  friendStatus
}: {
  friendStatus: Maybe<FriendRequestStatus> | undefined
}) {
  const [requestFriend] = useRequestFriendMutation({
    variables: {
      userId: parseInt(router.query.userId as string)
    },
    refetchQueries: [
      {
        query: UserDocument,
        variables: { id: parseInt(router.query.userId as string) }
      }
    ]
  })

  switch (friendStatus) {
    case 'ACCEPTED':
      return <button onClick={() => requestFriend()}>Following</button>
    case 'REJECTED':
      return (
        <button onClick={() => requestFriend()}>Send Friend Request</button>
      )
    case 'BLOCKED_USER1':
      return null
    case 'BLOCKED_USER2':
      return <p>You have blocked this user.</p>
    default:
      return (
        <button
          onClick={() => requestFriend()}
          className="bg-transparent text-rose-600 dark:text-rose-600"
        >
          Pending
        </button>
      )
  }
}
