import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Charity({ me }) {
  const router = useRouter()

  return (
    <Body title="Event" me={me}>
      <p>{router.query.eventId}</p>
    </Body>
  )
})
