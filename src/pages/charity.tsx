import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Charity({ me }) {
  const router = useRouter()

  return (
    <Body title="Charity" me={me}>
      <p>{router.query.charityId}</p>
    </Body>
  )
})
