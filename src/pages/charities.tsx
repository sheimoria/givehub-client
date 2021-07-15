import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Charities({ me }) {
  const router = useRouter()

  return (
    <Body title="Charities" me={me}>
      <p>{router.query.userId}</p>
    </Body>
  )
})
