import {
  FriendRecommendationsDocument,
  FriendRequestStatus,
  UserDocument,
  UserFriendFragment,
  useRequestFriendMutation
} from 'generated/graphql'

import router from 'next/router'

type Props = {
  user: UserFriendFragment
  className?: string
}

export default function RequestFriendButton({ user, className }: Props) {
  const [requestFriend] = useRequestFriendMutation({
    variables: {
      userId: user.id
    },
    refetchQueries: [
      {
        query: UserDocument,
        variables: { id: user.id }
      }
    ]
  })

  switch (user.friendStatus) {
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
