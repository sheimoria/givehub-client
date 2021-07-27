import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import Events from 'components/Events/Events'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import Posts from 'components/Posts/Posts'
import { UserAvatarFragmentDoc } from 'generated/graphql'
import UserPost from 'components/Users/UserPost'
import UserTasks from 'components/Users/YourEvents'
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
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      <UserPost user={filter(UserAvatarFragmentDoc, me)} />
      {!router.query.view ? <Posts /> : <Events />}
    </Body>
  )
})
