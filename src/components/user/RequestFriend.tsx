import {
  FriendRequestStatus,
  UserDocument,
  useRequestFriendMutation
} from 'generated/graphql'

import router from 'next/router'

export default function RequestFriend({
  friendStatus
}: {
  friendStatus: FriendRequestStatus
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
      return (
        <button
          onClick={() => requestFriend()}
          className="rounded-button-outline"
        >
          Following
        </button>
      )
    case 'REJECTED':
      return (
        <button
          onClick={() => requestFriend()}
          className="rounded-button-solid"
        >
          Send Friend Request
        </button>
      )
    case 'BLOCKED_USER1':
      return null
    case 'BLOCKED_USER2':
      return <p>You have blocked this user.</p>
    default:
      return (
        <button
          onClick={() => requestFriend()}
          className="rounded-button-outline"
        >
          Pending
        </button>
      )
  }
}
