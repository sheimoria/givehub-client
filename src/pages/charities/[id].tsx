import Body from 'components/layout/Body'
import CharityActions from 'components/charities/CharityActions'
import CharityEvents from 'components/charities/CharityEvents'
import CharityProfile from 'components/charities/CharityProfile'
import { useRouter } from 'next/router'

export default function Charity() {
  const router = useRouter()
  return (
    <Body title="View charity">
      <CharityProfile id={parseInt(router.query.id as string)} />
      <CharityActions id={parseInt(router.query.id as string)} />
      <CharityEvents />
    </Body>
  )
}
