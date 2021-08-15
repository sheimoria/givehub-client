import Link from 'next/link'
import Picture from 'components/Picture'
import RequestFriendButton from 'components/users/RequestFriendButton'
import { UserFriendFragmentDoc, UserHeaderFragment } from 'generated/graphql'
import { filter } from 'graphql-anywhere'
import router from 'next/router'

export default function UserHeader({ user }: { user: UserHeaderFragment }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() =>
          router.push({
            pathname: '/user',
            query: { userId: user.id }
          })
        }
      >
        <Picture pictureId={user.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="truncate hover:text-gray-800 dark:hover:text-gray-100">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <span className="text-xs truncate text-rose-600">
            @{user.username}
          </span>
        </div>
      </div>
      <RequestFriendButton user={filter(UserFriendFragmentDoc, user)} />
    </div>
  )
}
