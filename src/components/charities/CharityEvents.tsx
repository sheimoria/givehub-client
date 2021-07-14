import Event from 'components/Event'
import useCharityQuery from 'hooks/useCharityQuery'
import { useRouter } from 'next/router'

export default function CharityEvents() {
  const router = useRouter()
  const { data } = useCharityQuery(parseInt(router.query.id as string))
  return (
    <section>
      {data && data.charitySearchByID && (
        <>
          {data.charitySearchByID.charityEvents.map((event) => (
            <Event key={event.id} id={event.id} />
          ))}
        </>
      )}
    </section>
  )
}
