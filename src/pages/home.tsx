import Body from 'components/layout/Body'
import Events from 'components/events/Events'
import Posts from 'components/posts/Posts'
import { UserAvatarFragmentDoc } from 'generated/graphql'
import UserPost from 'components/users/UserPost'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import PeopleToFollow from 'components/users/PeopleToFollow'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'
import CharitiesToFollow from 'components/users/CharitiesToFollow'

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
