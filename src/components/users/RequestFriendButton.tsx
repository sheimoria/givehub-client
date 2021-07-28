import {
  FriendRecommendationsDocument,
  FriendRequestStatus,
  Maybe,
  UserDocument,
  useRequestFriendMutation
} from 'generated/graphql'

import router from 'next/router'

type Props = {
  friendStatus: Maybe<FriendRequestStatus> | undefined
  className?: string
}

export default function RequestFriendButton({
  friendStatus,
  className
}: Props) {
  const [requestFriend] = useRequestFriendMutation({
    variables: {
      userId: parseInt(router.query.userId as string)
    },
    refetchQueries: [
      {
        query: UserDocument,
        variables: { id: parseInt(router.query.userId as string) }
      },
      {
        query: FriendRecommendationsDocument,
        variables: { limit: 4 }
      }
    ]
  })

  switch (friendStatus) {
    case FriendRequestStatus.Accepted:
      return (
        <button
          onClick={() => requestFriend()}
          className={`button-outline ${className}`}
        >
          Friends
        </button>
      )
    case FriendRequestStatus.User1Req || FriendRequestStatus.User2Req:
      return (
        <button
          onClick={() => requestFriend()}
          className={`button-outline ${className}`}
        >
          Requested
        </button>
      )
    case FriendRequestStatus.BlockedUser1 || FriendRequestStatus.BlockedUser2:
      return <button className={`button-outline ${className}`}>Blocked</button>
    default:
      return (
        <button onClick={() => requestFriend()} className={className}>
          Add Friend
        </button>
      )
  }
}
