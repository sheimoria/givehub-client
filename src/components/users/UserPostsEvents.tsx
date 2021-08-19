import Event from 'components/events/EventCard'
import { useState } from 'react'
import PostCard from 'components/posts/PostCard'
import { UserPostsEventsFragment } from 'generated/graphql'

export default function UserEventButtons({
  user
}: {
  user: UserPostsEventsFragment
}) {
  const [filter, setFilter] = useState('Liked Events')

  return (
    <section>
      <div className="flex flex-col gap-4 px-6 sm:flex-row sm:px-0">
        <button
          onClick={() => setFilter('Posts')}
          className={`
            ${filter === 'Posts' ? 'nav-active' : 'nav-inactive'}
            nav flex-1 justify-center`}
          aria-current={filter === 'Posts' ? 'page' : undefined}
        >
          Posts
        </button>
        <button
          onClick={() => setFilter('Liked Events')}
          className={`
            ${filter === 'Liked Events' ? 'nav-active' : 'nav-inactive'}
            nav flex-1 justify-center`}
          aria-current={filter === 'Liked Events' ? 'page' : undefined}
        >
          Liked Events
        </button>
        <button
          onClick={() => setFilter('Volunteer History')}
          className={`
            ${filter === 'Volunteer History' ? 'nav-active' : 'nav-inactive'}
            nav flex-1 justify-center cursor-pointer`}
          aria-current={filter === 'Volunteer History' ? 'page' : undefined}
        >
          Volunteer History
        </button>
      </div>
      {filter === 'Posts'
        ? user.posts?.map((post) => (
            <PostCard
              key={post.post.id}
              post={post.post}
              event={post.event ? post.event : undefined}
            />
          ))
        : filter === 'Liked Events'
        ? user.likedEvents.map((event) => (
            <Event key={event.id} event={event} lineclamp />
          ))
        : user.volunteeredEvents?.map((event) => (
            <Event key={event.id} event={event} lineclamp />
          ))}
    </section>
  )
}
