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
    case FriendRequestStatus.Accepted:
      return (
        <button onClick={() => requestFriend()} className="button-outline">
          Following
        </button>
      )
    case FriendRequestStatus.User1Req || FriendRequestStatus.User2Req:
      return (
        <button onClick={() => requestFriend()} className="button-outline">
          Requested
        </button>
      )
    case FriendRequestStatus.BlockedUser1 || FriendRequestStatus.BlockedUser2:
      return <button className="button-outline">Blocked</button>
    default:
      return <button onClick={() => requestFriend()}>Follow</button>
  }
}
