import { UsersIcon } from '@heroicons/react/outline'
import { UserFriendsFragment } from 'generated/graphql'
import useToggle from 'utils/useToggle'
import UserFriendsModal from './UserFriendsModal'

export default function UserFriendsButton({
  user
}: {
  user: UserFriendsFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className="flex items-center gap-2 font-medium text-gray-700 transition-colors dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300"
      >
        <UsersIcon className="secondary" />
        {user.friendNumber} {user.friendNumber === 1 ? 'friend' : 'friends'}
      </button>
      {isOpen && (
        <UserFriendsModal toggleIsOpen={toggleIsOpen} friends={user.friends} />
      )}
    </>
  )
}
