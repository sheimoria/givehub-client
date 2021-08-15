import {
  CharityDocument,
  CharityHeaderFragment,
  useFollowCharityMutation
} from 'generated/graphql'

import Picture from 'components/Picture'
import { PlusSmIcon } from '@heroicons/react/solid'
import router from 'next/router'
import React from 'react'
import {
  IdentificationIcon,
  UserAddIcon,
  UsersIcon
} from '@heroicons/react/outline'

export default function CharityHeader({
  charity
}: {
  charity: CharityHeaderFragment
}) {
  const [followCharity] = useFollowCharityMutation({
    variables: { charityId: charity.id },
    refetchQueries: [
      {
        query: CharityDocument,
        variables: { charityId: charity.id }
      }
    ]
  })

  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() =>
          router.push({
            pathname: '/charity',
            query: { charityId: charity.id }
          })
        }
      >
        <Picture pictureId={charity.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="hover:text-gray-800 dark:hover:text-gray-100 line-clamp-1">
            {charity.name}
          </h6>

          <span className="text-xs text-rose-600">
            {charity.categories[0].name}{' '}
            {charity.categories.length > 1 && (
              <span className="text-xs text-rose-600">&hellip;</span>
            )}
          </span>
        </div>
      </div>
      {charity.adminStatus ? (
        <button className="pointer-events-none btn-secondary">
          <IdentificationIcon />
          Admin
        </button>
      ) : charity.followStatus === 1 ? (
        <button onClick={() => followCharity()} className="btn-secondary">
          <UsersIcon />
          Following
        </button>
      ) : (
        <button onClick={() => followCharity()} className="btn-primary">
          <UserAddIcon />
          Follow
        </button>
      )}
    </div>
  )
}
