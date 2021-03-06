import {
  CharityHeaderFragment,
  useCharityRecommendationsQuery
} from 'generated/graphql'

import CharityHeader from 'components/charities/CharityHeader'
import Transit from 'components/Transit'

export default function CharitiesToFollow() {
  const { data } = useCharityRecommendationsQuery({ variables: { limit: 4 } })
  return (
    <Transit as="dl">
      <h5>Charities to Follow</h5>
      {data &&
        //@ts-ignore
        data.charityRecommender?.items.map((charity: CharityHeaderFragment) => (
          <CharityHeader key={charity.id} charity={charity} />
        ))}
    </Transit>
  )
}
