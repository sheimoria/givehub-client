import CharityHeader from 'components/charities/CharityHeader'
import Transit from 'components/Transit'
import {
  CharityHeaderFragment,
  useCharityRecommendationsQuery
} from 'generated/graphql'

export default function CharitiesToFollow() {
  const { data } = useCharityRecommendationsQuery({ variables: { limit: 4 } })
  console.log(data)
  return (
    <Transit as="dl">
      <h5>Charities to Follow</h5>
      <div className="divide">
        {data &&
          //@ts-ignore
          data.charityRecommender?.items.map(
            (charity: CharityHeaderFragment) => (
              <CharityHeader key={charity.id} charity={charity} />
            )
          )}
      </div>
    </Transit>
  )
}
