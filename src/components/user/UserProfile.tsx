import {
  HeartIcon,
  IdentificationIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/solid'

import Link from 'next/link'
import Picture from 'components/Picture'
import React from 'react'
import RequestFriend from './RequestFriend'
import { UserProfileFragment } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function UserProfile({
  userProfile
}: {
  userProfile: UserProfileFragment
}) {
  const router = useRouter()

  return (
    <article className="items-start">
      <div className="flex flex-wrap items-center gap-3">
        {/* Display Picture */}
        <Picture size={54} />
        <div className="flex flex-col">
          {/* Name */}
          <h5>
            {userProfile.profile.firstName} {userProfile.profile.lastName}
          </h5>
          {/* Handle */}
          <p>@{userProfile.username}</p>
        </div>
      </div>
      {/* About */}
      <p>{userProfile.profile?.about}</p>
      {/* Interests */}
      <div className="flex flex-wrap items-center gap-2">
        <p>
          <HeartIcon />
          Interested in
        </p>
        {userProfile.categories.map((category) => (
          <Link
            key={category.id}
            href={{ pathname: '/home', query: { view: category.id } }}
          >
            <a className="font-normal text-rose-600 dark:text-rose-600">
              {category.name}
            </a>
          </Link>
        ))}
      </div>
      {/* Admin for */}
      {userProfile.adminCharities.length > 0 && (
        <div className="flex items-center gap-2">
          <p>
            <IdentificationIcon />
            Admin for{' '}
            {userProfile.adminCharities.map((charity) => (
              <Link
                key={charity.id}
                href={{
                  pathname: '/charity',
                  query: { charityId: charity.id }
                }}
              >
                <a className="font-normal text-rose-600 dark:text-rose-600">
                  {charity.name}
                </a>
              </Link>
            ))}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-6">
        {/* Friends */}
        <div className="flex items-center gap-2">
          <UsersIcon />
          <p>
            {userProfile.friendNumber}{' '}
            {userProfile.friendNumber === 1 ? 'friend' : 'friends'}
          </p>
        </div>
        {/* Causes */}
        <div className="flex items-center gap-2">
          <UserGroupIcon />
          <p>
            {userProfile.followedCharitiesNumber}{' '}
            {userProfile.followedCharitiesNumber === 1
              ? 'charity'
              : 'charities'}
          </p>
        </div>
      </div>
      <RequestFriend friendStatus={userProfile.friendStatus} />
    </article>
  )
}

function TelegramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-telegram"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
    </svg>
  )
}
