import {
  CharityHeaderFragment,
  useSearchCharitiesQuery,
  useSearchEventsQuery,
  useSearchUsersQuery
} from 'generated/graphql'

import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import UserEvents from 'components/users/YourEvents'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import EventSnippet from 'components/events/EventSnippet'

export default withAuth(function Home({ me }) {
  const router = useRouter()
  const { data: users } = useSearchUsersQuery({
    variables: { input: router.query.searchValue as string, limit: 50 }
  })
  const { data: charities } = useSearchCharitiesQuery({
    variables: { input: router.query.searchValue as string, limit: 50 }
  })
  const { data: events } = useSearchEventsQuery({
    variables: { input: router.query.searchValue as string, limit: 50 }
  })

  return (
    <Body
      title="Search"
      me={me}
      aside={
        <>
          <FriendRequests />
          <UserEvents />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      <Transit as="dl">
        <h5>Users</h5>
        {users && router.query.searchValue != ''
          ? users.searchUsers.items.map((user) => (
              <div
                key={user.id}
                onClick={() =>
                  router.push({
                    pathname: '/user',
                    query: { userId: user.id }
                  })
                }
                className="flex items-center gap-4 cursor-pointer"
              >
                <Picture pictureId={user.profile?.displayPicture} />
                <div className="flex flex-col">
                  <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h6>
                  <span className="text-xs text-rose-600">
                    @{user.username}
                  </span>
                </div>
              </div>
            ))
          : null}
        <h5>Charities</h5>
        {charities && router.query.searchValue != ''
          ? charities.searchCharities.items.map(
              (charity: CharityHeaderFragment) => (
                <div
                  key={charity.id}
                  onClick={() =>
                    router.push({
                      pathname: '/charity',
                      query: { charityId: charity.id }
                    })
                  }
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <Picture pictureId={charity.profile?.displayPicture} />
                  <div className="flex flex-col">
                    <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
                      {charity.name}
                    </h6>
                    {charity.categories.map((category) => (
                      <span className="text-xs text-rose-600" key={category.id}>
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )
          : null}
        <h5>Events</h5>
        {events && router.query.searchValue != ''
          ? events.searchEvents.items.map((event) => (
              <EventSnippet key={event.id} event={event} />
            ))
          : null}
      </Transit>
    </Body>
  )
})
