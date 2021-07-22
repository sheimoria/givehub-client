import Picture from 'components/Picture'
import {
  FriendRequestsDocument,
  useAcceptFriendRequestMutation,
  UserHeaderFragment
} from 'generated/graphql'
import Link from 'next/link'
import React from 'react'

export default function FriendRequest({ user }: { user: UserHeaderFragment }) {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation()
  return (
    <div className="flex flex-wrap justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Picture size={36} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/user',
              query: { userId: user.id }
            }}
          >
            <a className="truncate">
              {user.profile?.firstName} {user.profile?.firstName}
            </a>
          </Link>
          <p className="truncate">{user.username}</p>
        </div>
      </div>
      <div className="flex items-center flex-none gap-2">
        <button
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: false },
              refetchQueries: [{ query: FriendRequestsDocument }]
            })
          }
          className="px-3 py-1 button-outline"
        >
          Reject
        </button>
        <button
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: true },
              refetchQueries: [{ query: FriendRequestsDocument }]
            })
          }
        >
          Accept
        </button>
      </div>
    </div>
  )
}
