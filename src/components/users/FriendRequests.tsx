import FriendRequest from './FriendRequest'
import Transit from 'components/Transit'
import { useFriendRequestsQuery } from 'generated/graphql'

export default function FriendRequests() {
  const { data } = useFriendRequestsQuery()
  return (
    <Transit as="dl">
      <h5>Friend Requests</h5>
      {data?.viewMyPendingFriendRequests?.userList &&
        (data.viewMyPendingFriendRequests.userList.length > 0 ? (
          data.viewMyPendingFriendRequests.userList.map((user) => (
            <FriendRequest key={user.id} user={user} />
          ))
        ) : (
          <p> You have no pending friend requests.</p>
        ))}
    </Transit>
  )
}
