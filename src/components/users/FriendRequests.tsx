import Transit from 'components/Transit'
import { useFriendRequestsQuery } from 'generated/graphql'
import FriendRequest from './FriendRequest'

export default function FriendRequests() {
  const { data } = useFriendRequestsQuery()
  return (
    <Transit as="dl">
      <h5>Friend Requests</h5>
      <div className="divide">
        {data && data.viewMyPendingFriendRequests.userList.length > 0 ? (
          //@ts-ignore
          data.viewMyPendingFriendRequests?.userList.map((user) => (
            <FriendRequest key={user.id} user={user} />
          ))
        ) : (
          <div className="py-3">
            <p> You have no pending friend requests.</p>
          </div>
        )}
      </div>
    </Transit>
  )
}
