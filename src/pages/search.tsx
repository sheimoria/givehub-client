import {
  CharityHeaderFragment,
  EventHeaderFragment,
  useSearchCharitiesQuery,
  useSearchEventsQuery,
  useSearchUsersQuery
} from 'generated/graphql'

import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import EventHeader from 'components/events/EventHeader'
import FriendRequests from 'components/users/FriendRequests'
import Link from 'next/link'
import PeopleToFollow from 'components/users/PeopleToFollow'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import UserTasks from 'components/users/UserEvents'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

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
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      <Transit>
        <dl className="px-0 py-2 divide">
          <div className="flex flex-col gap-3 px-5 py-3">
            <h5>Users</h5>
            {users && router.query.searchValue != '' && (
              <div className="-my-3 divide">
                {users.searchUsers.items.map((user) => (
                  <div key={user.id} className="flex gap-3 py-3">
                    <Picture
                      pictureId={user.profile?.displayPicture}
                      size={10}
                    />
                    <div className="flex flex-col">
                      <Link
                        href={{
                          pathname: '/user',
                          query: { userId: user.id }
                        }}
                      >
                        <a>
                          {user.profile?.firstName} {user.profile?.lastName}
                        </a>
                      </Link>
                      <p>@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 px-5 py-3">
            <h5>Charities</h5>
            {charities && router.query.searchValue != '' && (
              <div className="-my-3 divide">
                {charities.searchCharities.items.map(
                  (charity: CharityHeaderFragment) => (
                    <div key={charity.id} className="flex gap-3 py-3">
                      <Picture
                        pictureId={charity.profile?.displayPicture}
                        size={10}
                      />
                      <div className="flex flex-col">
                        <Link
                          href={{
                            pathname: '/charity',
                            query: { charityId: charity.id }
                          }}
                        >
                          <a>{charity.name}</a>
                        </Link>
                        {charity.categories.map((category) => (
                          <p key={category.id}>{category.name}</p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 px-5 py-3">
            <h5>Events</h5>
            {events && router.query.searchValue != '' && (
              <div className="space-y-3">
                {events.searchEvents.items.map(
                  (eventHeader: EventHeaderFragment) => (
                    <div
                      key={eventHeader.id}
                      className="p-3 border border-gray-200 rounded-lg dark:border-gray-700"
                    >
                      <EventHeader event={eventHeader} />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </dl>
      </Transit>
    </Body>
  )
})
