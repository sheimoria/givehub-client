import {
  GlobeAltIcon,
  LocationMarkerIcon,
  UserGroupIcon
} from '@heroicons/react/solid'

import { CharityProfileFragment } from 'generated/graphql'
import FollowCharity from './FollowCharity'
import Picture from 'components/Picture'
import React from 'react'
import { Transition } from '@headlessui/react'

export default function CharityProfile({
  charityProfile
}: {
  charityProfile: CharityProfileFragment
}) {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100"
      leave="transition duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 translate-y-2"
    >
      {' '}
      <article>
        <div className="flex flex-wrap items-center gap-6">
          {/* Display Picture */}
          <Picture size={72} />

          <div className="flex flex-col items-start gap-4">
            {/* Name */}
            <h5>{charityProfile.name}</h5>

            {/* Categories */}
            {charityProfile.categories.map((category) => (
              <span key={category.id} className="badge">
                {category.name}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="flex items-center gap-2">
          <p>{charityProfile.profile?.about}</p>
        </div>

        {/* Address */}
        <p>
          <LocationMarkerIcon />
          {charityProfile.physicalAddress}
          {', '}
          {charityProfile.postalCode}
        </p>

        {/* Website */}
        {charityProfile.profile?.links && (
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="text-gray-600" />
            <a
              className="font-normal text-rose-600 hover:text-rose-700"
              href={charityProfile.profile.links}
            >
              {charityProfile.profile.links}
            </a>
          </div>
        )}

        {/* Followers */}
        <p>
          <UserGroupIcon />
          {charityProfile.followNumber} followers
        </p>

        <FollowCharity followStatus={charityProfile.followStatus} />
      </article>
    </Transition>
  )
}
