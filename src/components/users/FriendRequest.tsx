import Picture from 'components/Picture'
import {
  FriendRequestsDocument,
  useAcceptFriendRequestMutation,
  UserHeaderFragment
} from 'generated/graphql'

export default function FriendRequest({ user }: { user: UserHeaderFragment }) {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation({
    refetchQueries: [{ query: FriendRequestsDocument }]
  })
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Picture size={36} />
        <div className="flex flex-col gap-1">
          <a>
            {user.profile?.firstName} {user.profile?.firstName}
          </a>
          <p>{user.username}</p>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: false }
            })
          }
        >
          Reject
        </button>
        <button
          onClick={() =>
            acceptFriendRequest({
              variables: { userId: user.id, accept: true }
            })
          }
        >
          Accept
        </button>
      </div>
    </div>
  )
}
