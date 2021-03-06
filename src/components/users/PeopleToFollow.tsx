import {
  UserHeaderFragment,
  useFriendRecommendationsQuery
} from 'generated/graphql'

import Transit from 'components/Transit'
import UserHeader from 'components/users/UserHeader'

export default function PeopleToFollow() {
  const { data } = useFriendRecommendationsQuery({ variables: { limit: 4 } })

  return (
    <Transit as="dl">
      <h5>People with Similar Interests</h5>
      {data?.userRecommender?.items.map((user: UserHeaderFragment) => (
        <UserHeader key={user.id} user={user} />
      ))}
    </Transit>
  )
}
