import { GlobeAltIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import Event from 'components/Event'
import Body from 'components/layout/Body'
import FollowCharityButton from 'components/charities/FollowCharity'
import Picture from 'components/Picture'
import React from 'react'
import { useCharityQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Charity({ me }) {
  const router = useRouter()
  const { data } = useCharityQuery({
    variables: { charityId: parseInt(router.query.charityId as string) }
  })

  return (
    <Body title="Charity" me={me}>
      {data && (
        <>
          <article>
            <div className="flex flex-wrap items-center gap-6">
              {/* Display Picture */}
              <Picture size={72} />
              <div className="flex flex-col items-start gap-4">
                {/* Name */}
                <h5>{data.charitySearchByID.name}</h5>
                {/* Categories */}
                {data.charitySearchByID.categories.map((category) => (
                  <span key={category.id} className="badge">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            {/* About */}
            {data.charitySearchByID.profile?.about && (
              <div className="flex items-center gap-2">
                <p>{data.charitySearchByID.profile.about}</p>
              </div>
            )}
            {/* Address */}
            <div className="flex items-center gap-2">
              <LocationMarkerIcon />
              <p>
                {data.charitySearchByID.physicalAddress}
                {', '}
                {data.charitySearchByID.postalcode}
              </p>
            </div>
            {/* Website */}
            {data.charitySearchByID.profile?.links && (
              <div className="flex items-center gap-2">
                <GlobeAltIcon />
                <a>{data.charitySearchByID.profile.links}</a>
              </div>
            )}
            <FollowCharityButton
              followCharity={{
                id: data.charitySearchByID.id,
                followNumber: data.charitySearchByID.followNumber,
                followStatus: data.charitySearchByID.followStatus
              }}
            />
          </article>
          {data.charitySearchByID.charityEvents &&
            data.charitySearchByID.charityEvents.map((event) => (
              <Event key={event.id} event={event} />
            ))}
        </>
      )}
    </Body>
  )
})
