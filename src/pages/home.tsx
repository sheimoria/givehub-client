import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import Events from 'components/events/Events'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import Posts from 'components/posts/Posts'
import UserEvents from 'components/users/UserEvents'
import { UserPictureFragmentDoc } from 'generated/graphql'
import UserPost from 'components/users/UserPost'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Home({ me }) {
  const router = useRouter()
  return (
    <Body
      title="Home"
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
      <UserPost user={filter(UserPictureFragmentDoc, me)} />
      {!router.query.view ? <Posts /> : <Events />}
    </Body>
  )
})
