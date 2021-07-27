import { CharityProfileFragmentDoc, useCharityQuery } from 'generated/graphql'

import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import CharityEvents from 'components/Charities/CharityEvents'
import CharityProfile from 'components/Charities/CharityProfile'
import CreateEventButton from 'components/Events/CreateEventButton'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import UserTasks from 'components/Users/YourEvents'
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
