import Event from 'components/events/Event'
import { UserEventsFragment } from 'generated/graphql'
import classNames from 'utils/classNames'
import { useState } from 'react'
export default function UserEventButtons({
  user
}: {
  user: UserEventsFragment
}) {
  const [filter, setFilter] = useState('Liked Events')

  return (
    <section>
      <div className="flex flex-wrap gap-4">
        <a
          onClick={() => setFilter('Liked Events')}
          className={classNames(
            filter === 'Liked Events' ? 'nav-active' : 'nav-inactive',
            'nav flex-1 justify-center'
          )}
          aria-current={filter === 'Liked Events' ? 'page' : undefined}
        >
          Liked Events
        </a>
        <a
          onClick={() => setFilter('Volunteer History')}
          className={classNames(
            filter === 'Volunteer History' ? 'nav-active' : 'nav-inactive',
            'nav flex-1 justify-center'
          )}
          aria-current={filter === 'Volunteer History' ? 'page' : undefined}
        >
          Volunteer History
        </a>
      </div>
      {filter === 'Liked'
        ? user.likedEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))
        : user.volunteeredEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))}
    </section>
  )
}
