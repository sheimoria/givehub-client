import Link from 'next/link'
import Picture from 'components/Picture'
import RequestFriendButton from 'components/users/RequestFriendButton'
import { UserHeaderFragment } from 'generated/graphql'

export default function UserHeader({ user }: { user: UserHeaderFragment }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Picture pictureId={user.profile?.displayPicture} size={10} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/user',
              query: { userId: user.id }
            }}
          >
            <a className="truncate">
              {user.profile?.firstName} {user.profile?.lastName}
            </a>
          </Link>
          <p className="text-xs truncate">@{user.username}</p>
        </div>
      </div>
      <RequestFriendButton
        friendStatus={user.friendStatus}
        className="px-3 py-1"
      />
    </div>
  )
}
