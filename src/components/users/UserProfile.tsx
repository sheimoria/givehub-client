import {
  HeartIcon,
  IdentificationIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/outline'
import Image from 'next/image'
import RequestFriend from 'components/users/RequestFriendButton'
import UpdateUserProfileButton from 'components/users/UpdateUserProfileButton'
import {
  CharityHeaderFragmentDoc,
  UserCharitiesFragmentDoc,
  UserFriendFragmentDoc,
  UserFriendsFragmentDoc,
  UserProfileFragment
} from 'generated/graphql'
import router from 'next/router'
import { filter } from 'graphql-anywhere'
import CharityHeader from 'components/charities/CharityHeader'
import Transit from 'components/Transit'
import React from 'react'
import UserFriendsButton from './UserFriendsButton'
import UserCharitiesButton from './UserCharitiesButton'

export default function UserProfile({ user }: { user: UserProfileFragment }) {
  return (
    <Transit onEveryMount as="article" className="px-6 pb-6 place-items-start">
      <div className="relative flex-none w-24 h-24 overflow-hidden rounded-full place-self-center">
        {user.profile?.displayPicture ? (
          <Image
            src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${user.profile.displayPicture}`}
            alt="Profile picture"
            layout="fill"
          />
        ) : (
          <Image src="/avatar.svg" alt="Picture" layout="fill" />
        )}
      </div>
      <div className="flex flex-col items-center place-self-center">
        <h5>
          {user.profile?.firstName} {user.profile?.lastName}
        </h5>
        <span className="text-sm text-rose-600">@{user.username}</span>
      </div>
      <p className="place-self-center">{user.profile?.about}</p>
      <div className="flex flex-wrap gap-6 place-self-center">
        <UserFriendsButton user={filter(UserFriendsFragmentDoc, user)} />
        <UserCharitiesButton user={filter(UserCharitiesFragmentDoc, user)} />
      </div>
      <div className="flex items-center gap-2">
        <HeartIcon className="secondary" />
        <h5>Interests</h5>
      </div>
      <div className="flex flex-wrap gap-2 place-self-stretch">
        {user.categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              router.push({ pathname: '/home', query: { view: category.id } })
            }
            className="px-4 py-2 text-sm font-medium transition-colors rounded-full dark:hover:bg-rose-800 dark:bg-rose-900 hover:bg-rose-200 bg-rose-100 text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:text-rose-700"
          >
            {category.name}
          </button>
        ))}
      </div>
      {user.adminCharities.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <IdentificationIcon className="text-gray-400 dark:text-gray-500" />
            <h5>Admin for</h5>
          </div>
          <section className="place-self-stretch">
            {user.adminCharities.map((charity) => (
              <CharityHeader
                key={charity.id}
                charity={filter(CharityHeaderFragmentDoc, charity)}
              />
            ))}
          </section>
        </>
      )}
      {user.viewerStatus ? (
        <UpdateUserProfileButton user={user} />
      ) : (
        <RequestFriend user={filter(UserFriendFragmentDoc, user)} />
      )}
    </Transit>
  )
}
