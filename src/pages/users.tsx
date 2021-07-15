import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Users({ me }) {
  const router = useRouter()

  return (
    <Body title="User" me={me}>
      <p>{router.query.userId}</p>
    </Body>
  )
})
