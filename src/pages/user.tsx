import {
  UserPostsEventsFragmentDoc,
  UserProfileFragmentDoc,
  useUserQuery
} from 'generated/graphql'

import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import UserPostsEvents from 'components/users/UserPostsEvents'
import UserEvents from 'components/users/UserEvents'
import UserProfile from 'components/users/UserProfile'
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
          <UserPostsEvents
            user={filter(UserPostsEventsFragmentDoc, data.user)}
          />
        </>
      )}
    </Body>
  )
})
