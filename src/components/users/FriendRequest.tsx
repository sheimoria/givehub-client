import {
  FriendRequestsDocument,
  UserHeaderFragment,
  useAcceptFriendRequestMutation
} from 'generated/graphql'

import Picture from 'components/Picture'
import router from 'next/router'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import React from 'react'

export default function FriendRequest({ user }: { user: UserHeaderFragment }) {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation()

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div
        onClick={() =>
          router.push({
            pathname: '/user',
            query: { userId: user.id }
          })
        }
        className="flex items-center gap-4 cursor-pointer"
      >
        <Picture pictureId={user.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="truncate transition-colors hover:text-gray-800 dark:hover:text-gray-100">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <span className="text-xs truncate text-rose-600">
            @{user.username}
          </span>
        </div>
      </div>
      <div className="flex items-center flex-none gap-2">
        <XCircleIcon
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: false },
              refetchQueries: [{ query: FriendRequestsDocument }]
            })
          }
          className="w-7 h-7 clickable"
        />
        <CheckCircleIcon
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: true },
              refetchQueries: [{ query: FriendRequestsDocument }]
            })
          }
          className="transition-colors cursor-pointer w-7 h-7 text-rose-600 hover:text-rose-700 dark:hover:text-rose-500"
        />
      </div>
    </div>
  )
}
