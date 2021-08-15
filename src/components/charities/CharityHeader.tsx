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
        className="flex items-center gap-3 cursor-pointer"
        onClick={() =>
          router.push({
            pathname: '/charity',
            query: { charityId: charity.id }
          })
        }
      >
        <Picture pictureId={charity.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="hover:text-gray-800 dark:hover:text-gray-100">
            {charity.name}
          </h6>
          <p className="text-xs text-rose-600 dark:text-rose-600">
            {charity.categories[0].name} &hellip;
          </p>
        </div>
      </div>
      {charity.adminStatus ? (
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md pointer-events-none bg-rose-100 text-rose-600">
          <IdentificationIcon />
          Admin
        </button>
      ) : charity.followStatus === 1 ? (
        <button
          onClick={() => followCharity()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-rose-200 bg-rose-100 text-rose-600 dark:hover:text-rose-500 hover:text-rose-700"
        >
          <UsersIcon />
          Following
        </button>
      ) : (
        <button
          onClick={() => followCharity()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-rose-200 bg-rose-100 text-rose-600 dark:hover:text-rose-500 hover:text-rose-700"
        >
          <UserAddIcon />
          Request
        </button>
      )}
    </div>
  )
}
