import {
  GlobeAltIcon,
  LocationMarkerIcon,
  UserGroupIcon
} from '@heroicons/react/outline'

import { CharityProfileFragment } from 'generated/graphql'
import FollowCharity from './FollowCharity'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

export default function CharityProfile({
  charityProfile
}: {
  charityProfile: CharityProfileFragment
}) {
  const router = useRouter()

  return (
    <Transit as="article">
      <div className="flex flex-wrap items-center gap-3">
        {/* Display Picture */}
        <Picture size={60} />
        <div className="flex flex-col items-start gap-1">
          {/* Name */}
          <h5>{charityProfile.name}</h5>
          {/* Categories */}
          {charityProfile.categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                router.push({ pathname: '/home', query: { view: category.id } })
              }
              className="text-xs"
            >
              {category.name}
            </button>
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
          <GlobeAltIcon />
          <a
            className=" text-rose-600 hover:text-rose-700"
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
    </Transit>
  )
}
