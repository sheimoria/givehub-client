import Transit from 'components/Transit'
import { useFriendRequestsQuery } from 'generated/graphql'
import React from 'react'
import FriendRequest from './FriendRequest'

export default function FriendRequests() {
  const { data } = useFriendRequestsQuery()
  return (
    <Transit>
      <article>
        <h5>Friend Requests</h5>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {data &&
            data.viewMyPendingFriendRequests.userList.map((user) => (
              <FriendRequest key={user.id} user={user} />
            ))}
        </div>
      </article>
    </Transit>
  )
}
