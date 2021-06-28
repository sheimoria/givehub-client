import EditCharity from 'components/EditCharity'
import useCharityQuery from 'hooks/useCharityQuery'

export default function CharityProfile({ id }) {
  const { data } = useCharityQuery(id)
  if (data) {
    const charity = data.charitySearchByID
    return (
      <section>
        <h5>Charity Profile</h5>
        <article>
          <h6 className="flex justify-between text-base">
            {charity.name}
            <EditCharity charity={charity} />
          </h6>
          <div className="flex flex-col gap-2">
            <h6>Address</h6>
            <p>{charity.physicalAddress}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h6>Postal code</h6>
            <p>{charity.postalcode}</p>
          </div>
        </article>
      </section>
    )
  }
  return null
}
