import UserHeader from 'components/users/UserHeader'
import Transit from 'components/Transit'
import {
  UserHeaderFragment,
  useFriendRecommendationsQuery
} from 'generated/graphql'

export default function PeopleToFollow() {
  const { data } = useFriendRecommendationsQuery({ variables: { limit: 4 } })

  return (
    <Transit as="dl">
      <h5>People to follow</h5>
      <div className="divide">
        {data &&
          data.userRecommender?.items.map((user: UserHeaderFragment) => (
            <UserHeader key={user.id} user={user} />
          ))}
      </div>
    </Transit>
  )
}
