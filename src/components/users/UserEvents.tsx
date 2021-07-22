import Event from 'components/events/Event'
import { UserEventsFragment } from 'generated/graphql'
import classNames from 'utils/classNames'
import { useState } from 'react'
export default function UserEvents({ user }: { user: UserEventsFragment }) {
  const [filter, setFilter] = useState('Liked')

  return (
    <section>
      <div className="flex flex-wrap gap-4">
        <a
          onClick={() => setFilter('Volunteered At')}
          className={classNames(
            filter === 'Liked' ? 'nav-active' : 'nav-inactive',
            'nav'
          )}
          aria-current={filter === 'Liked' ? 'page' : undefined}
        >
          Liked Events
        </a>
        <a
          onClick={() => setFilter('Liked')}
          className={classNames(
            filter === 'Volunteered At' ? 'navi-active' : 'nav-inactive',
            'nav'
          )}
          aria-current={filter === 'Volunteered At' ? 'page' : undefined}
        >
          Volunteered At
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
