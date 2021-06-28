import Body from 'components/layout/Body'
import CharityActions from 'components/CharityActions'
import CharityEvents from 'components/CharityEvents'
import CharityProfile from 'components/CharityProfile'
import { useRouter } from 'next/router'

export default function Charity() {
  const router = useRouter()
  return (
    <Body>
      <CharityProfile id={parseInt(router.query.id)} />
      <CharityActions />
      <CharityEvents />
    </Body>
  )
}
