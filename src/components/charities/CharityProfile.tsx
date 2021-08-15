import {
  GlobeAltIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import Image from 'next/image'
import { CharityProfileFragment } from 'generated/graphql'
import FollowCharity from 'components/charities/FollowCharity'
import Transit from 'components/Transit'
import UpdateCharityProfileButton from 'components/charities/UpdateCharityProfileButton'
import router from 'next/router'

export default function CharityProfile({
  charity
}: {
  charity: CharityProfileFragment
}) {
  return (
    <Transit onEveryMount as="article" className="px-6 pb-6 place-items-start">
      <div className="flex items-center gap-4">
        <div className="relative flex-none w-24 h-24 overflow-hidden rounded-full">
          {charity.profile?.displayPicture ? (
            <Image
              src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${charity.profile.displayPicture}`}
              alt="Profile Picture"
              layout="fill"
            />
          ) : (
            <Image src="/avatar.svg" alt="Picture" layout="fill" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h5>{charity.name}</h5>
          <div className="flex flex-wrap gap-2">
            {charity.categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  router.push({
                    pathname: '/home',
                    query: { view: category.id }
                  })
                }
                className="px-3 py-1 text-xs font-medium transition-colors rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p>{charity.profile?.about}</p>
      <div className="flex items-center gap-2">
        <UserGroupIcon className="secondary" />
        <h5>
          {charity.followNumber}{' '}
          {charity.followNumber === 1 ? 'follower' : 'followers'}
        </h5>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <PhoneIcon className="secondary" />
          <p>{charity.profile?.contactNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="secondary" />
          <p>{charity.profile?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LocationMarkerIcon className="secondary" />
        <p>
          {charity.physicalAddress}
          {', '}
          {charity.postalCode}
        </p>
      </div>
      {charity.profile?.links && (
        <div className="flex items-center gap-2">
          <GlobeAltIcon className="secondary" />
          <a
            className="text-sm font-medium text-rose-600 hover:text-rose-700"
            href={charity.profile.links}
          >
            {charity.profile.links}
          </a>
        </div>
      )}
      {charity.adminStatus ? (
        <UpdateCharityProfileButton charity={charity} />
      ) : (
        <FollowCharity followStatus={charity.followStatus} />
      )}
    </Transit>
  )
}
