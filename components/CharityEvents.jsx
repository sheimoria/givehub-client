import Event from 'components/events/Event'
import useCharityQuery from 'hooks/useCharityQuery'
import { useRouter } from 'next/router'

export default function CharityEvents() {
  const router = useRouter()
  const { data } = useCharityQuery(parseInt(router.query.id))
  return (
    <section>
      {data && data.charitySearchByID && (
        <>
          <h5>Charity Events</h5>
          {data.charitySearchByID.charityEvents.map((event) => (
            <Event key={event.id} id={event.id} />
          ))}
        </>
      )}
    </section>
  )
}
