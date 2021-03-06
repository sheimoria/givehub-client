import {
  FriendRequestStatus,
  UserDocument,
  UserFriendFragment,
  useRequestFriendMutation
} from 'generated/graphql'

import { UserAddIcon, UsersIcon } from '@heroicons/react/outline'
import React from 'react'

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
        <button onClick={() => requestFriend()} className="btn-secondary">
          <UsersIcon />
          Friends
        </button>
      )
    case FriendRequestStatus.User1Req:
      return (
        <button onClick={() => requestFriend()} className="btn-secondary">
          Requested
        </button>
      )
    case FriendRequestStatus.User2Req:
      return (
        <button onClick={() => requestFriend()} className="btn-secondary">
          Requested
        </button>
      )
    case FriendRequestStatus.BlockedUser1 || FriendRequestStatus.BlockedUser2:
      return <button className={`button-outline ${className}`}>Blocked</button>
    default:
      return (
        <button onClick={() => requestFriend()} className="btn-primary">
          <UserAddIcon />
          Request
        </button>
      )
  }
}
