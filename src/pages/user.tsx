import {
  UserEventsFragmentDoc,
  UserProfileFragmentDoc,
  useUserQuery
} from 'generated/graphql'

import Body from 'components/layout/Body'
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
    <Body title="User" me={me}>
      {data?.user && (
        <>
          <UserProfile
            userProfile={filter(UserProfileFragmentDoc, data.user)}
          />
          <UserEvents userEvents={filter(UserEventsFragmentDoc, data.user)} />
        </>
      )}
    </Body>
  )
})
