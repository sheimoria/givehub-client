import { CharityProfileFragmentDoc, useCharityQuery } from 'generated/graphql'

import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import CharityEvents from 'components/charities/CharityEvents'
import CharityProfile from 'components/charities/CharityProfile'
import CreateEventButton from 'components/events/CreateEventButton'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import UserTasks from 'components/users/YourEvents'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

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
          <FriendRequests />
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      {data?.charitySearchByID && (
        <>
          <CharityProfile
            charity={filter(CharityProfileFragmentDoc, data.charitySearchByID)}
          />
          {data.charitySearchByID?.adminStatus && <CreateEventButton />}
          <CharityEvents events={data.charitySearchByID?.charityEvents} />
        </>
      )}
    </Body>
  )
})
