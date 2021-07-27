import {
  UserEventsFragmentDoc,
  UserProfileFragmentDoc,
  useUserQuery
} from 'generated/graphql'

import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import UserEventButtons from 'components/Users/UserEvents'
import UserEvents from 'components/Users/YourEvents'
import UserProfile from 'components/Users/UserProfile'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function User({ me }) {
  const router = useRouter()
  const { data } = useUserQuery({
    variables: { id: parseInt(router.query.userId as string) }
  })

  return (
    <Body
      title="User"
      me={me}
      aside={
        <>
          <FriendRequests />
          <UserEvents />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      {data?.user && (
        <>
          <UserProfile user={filter(UserProfileFragmentDoc, data.user)} />
          <UserEventButtons user={filter(UserEventsFragmentDoc, data.user)} />
        </>
      )}
    </Body>
  )
})
