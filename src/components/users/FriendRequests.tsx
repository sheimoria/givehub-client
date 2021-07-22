import Transit from 'components/Transit'
import { useFriendRequestsQuery } from 'generated/graphql'
import FriendRequest from './FriendRequest'

export default function FriendRequests() {
  const { data } = useFriendRequestsQuery()
  return (
    <Transit>
      <article>
        <h5>Friend Requests</h5>
        <div className="divide">
          {data &&
            //@ts-ignore
            data.viewMyPendingFriendRequests?.userList.map((user) => (
              <FriendRequest key={user.id} user={user} />
            ))}
        </div>
      </article>
    </Transit>
  )
}
