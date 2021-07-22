import { CharityProfileFragmentDoc, useCharityQuery } from 'generated/graphql'

import Body from 'components/layout/Body'
import CharityEvents from 'components/charities/CharityEvents'
import CharityPost from 'components/charities/CharityPost'
import CharityProfile from 'components/charities/CharityProfile'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import React from 'react'
import UserTasks from 'components/users/UserTasks'
import PeopleToFollow from 'components/users/PeopleToFollow'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import VolunteerRequests from 'components/events/VolunteerRequests'
import FriendRequests from 'components/users/FriendRequests'

export default withAuth(function Charity({ me }) {
  const router = useRouter()
  const { data } = useCharityQuery({
    variables: { charityId: parseInt(router.query.charityId as string) }
  })

  return (
    <Body
      title="Charity"
      me={me}
      aside={
        <>
          {data.charitySearchByID.adminStatus ? (
            <VolunteerRequests />
          ) : (
            <FriendRequests />
          )}
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      {data && data.charitySearchByID && (
        <>
          <CharityProfile
            charityProfile={filter(
              CharityProfileFragmentDoc,
              data.charitySearchByID
            )}
          />
          {data.charitySearchByID?.adminStatus && <CharityPost />}
          <CharityEvents events={data.charitySearchByID.charityEvents} />
        </>
      )}
    </Body>
  )
})
