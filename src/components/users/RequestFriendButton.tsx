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
        <button
          onClick={() => requestFriend()}
          className="px-4 py-2 text-sm font-medium transition-colors rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
        >
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
