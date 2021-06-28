import Edit from 'components/events/Edit'
import Event from 'components/events/Event'
import { useRouter } from 'next/router'
import useUserQuery from 'hooks/useUserQuery'
const eventFilters = ['Liked', 'Requested', 'Volunteering', 'Volunteer History']

// Render user profile
export default function User() {
  const router = useRouter()
  // Get user data with user id
  const { data } = useUserQuery(parseInt(router.query.id))
  // Track which events to filter
  const [events, setEvents] = useState(eventFilters[0])

  return (
    <>
      {/* User information */}
      <article>
        <p>
          {data.user.firstName} {data.user.lastName}
        </p>
        <p>{data.user.username}</p>
        <p>{data.user.email}</p>
        {/* Edit button (only renders if user id matches session's user id) */}
        <Edit id={id} href="/users" />
      </article>
      {/* Tabs to filter user's events */}
      <article>
        <h4>{data.user.firstName}'s Events</h4>
        {eventFilters.map((eventFilter) => (
          <button
            onClick={() => setEvents(eventFilter)}
            className={
              events !== eventFilter &&
              'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-800'
            }
          >
            {eventFilter}
          </button>
        ))}
      </article>
      {/* Render user's events according to current filter */}
      {events === 'Liked' &&
        data.user.likedEvents.map((event) => <Event id={event.id} />)}
      {events === 'Requested' &&
        data.user.requestedEvents.map((event) => <Event id={event.id} />)}
      {events === 'Volunteering' &&
        data.user.volunteeringEvents.map((event) => <Event id={event.id} />)}
      {events === 'Volunteer History' &&
        data.user.volunteeredEvents.map((event) => <Event id={event.id} />)}
    </>
  )
}
