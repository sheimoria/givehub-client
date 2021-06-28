import Event from 'components/events/Event'
import useCharityQuery from 'hooks/useCharityQuery'
import { useRouter } from 'next/router'

export default function CharityProfile({ id }) {
  const router = useRouter()
  const { data } = useCharityQuery(id)
  if (data) {
    const charity = data.charitySearchByID
    return (
      <section>
        <h5>Charity Profile</h5>
        <article>
          <p>{charity.id}</p>
          <p>{charity.name}</p>
          <p>{charity.physicalAddress}</p>
          <p>{charity.postalcode}</p>
        </article>
      </section>
    )
  }
  return null
}
