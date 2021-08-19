import { UserGroupIcon } from '@heroicons/react/outline'
import { UserCharitiesFragment } from 'generated/graphql'
import useToggle from 'utils/useToggle'
import UserCharitiesModal from './UserCharitiesModal'

export default function UserCharitiesButton({
  user
}: {
  user: UserCharitiesFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className="flex items-center gap-2 font-medium text-gray-700 transition-colors dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300"
      >
        <UserGroupIcon className="secondary" />
        {user.followedCharitiesNumber}{' '}
        {user.followedCharitiesNumber === 1 ? 'charity' : 'charities'}
      </button>
      {isOpen && (
        <UserCharitiesModal
          toggleIsOpen={toggleIsOpen}
          charities={user.followedCharities}
        />
      )}
    </>
  )
}
