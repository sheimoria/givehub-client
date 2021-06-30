import Body from 'components/layout/Body'
import Event from 'components/events/Event'
import { useRouter } from 'next/router'

export default function ViewEvent() {
  const router = useRouter()

  return (
    <Body title="View Event">
      <Event id={parseInt(router.query.id as string)} />
    </Body>
  )
}
