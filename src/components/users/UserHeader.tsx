import { PlusIcon } from '@heroicons/react/outline'
import Picture from 'components/Picture'
import {
  FriendRecommendationsDocument,
  useRequestFriendMutation,
  UserHeaderFragment
} from 'generated/graphql'
import Link from 'next/link'

export default function UserHeader({ user }: { user: UserHeaderFragment }) {
  const [requestFriend] = useRequestFriendMutation()

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
      <button
        onClick={() =>
          requestFriend({
            variables: { userId: user.id },
            refetchQueries: [
              {
                query: FriendRecommendationsDocument,
                variables: { limit: 4 }
              }
            ]
          })
        }
      >
        <PlusIcon />
        Follow
      </button>
    </div>
  )
}
