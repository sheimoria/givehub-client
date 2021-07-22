import Body from 'components/layout/Body'
import Events from 'components/events/Events'
import Posts from 'components/posts/Posts'
import { UserAvatarFragmentDoc } from 'generated/graphql'
import UserPost from 'components/users/UserPost'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Home({ me }) {
  const router = useRouter()
  return (
    <Body title="Home" me={me}>
      <UserPost user={filter(UserAvatarFragmentDoc, me)} />
      {!router.query.view ? <Posts /> : <Events />}
    </Body>
  )
})
