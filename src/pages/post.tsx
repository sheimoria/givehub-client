import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Post({ me }) {
  const router = useRouter()
  return (
    <Body title="Post" me={me}>
      <p>{router.query.postId}</p>
    </Body>
  )
})
