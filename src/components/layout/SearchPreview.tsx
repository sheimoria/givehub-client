import {
  CharityHeaderFragment,
  EventSnippetFragment,
  useSearchCharitiesQuery,
  useSearchEventsQuery,
  useSearchUsersQuery
} from 'generated/graphql'

import { ArrowRightIcon } from '@heroicons/react/outline'
import EventSnippet from 'components/events/EventSnippet'
import Link from 'next/link'
import Picture from 'components/Picture'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

type SearchPreviewProps = {
  isOpen: boolean
  searchValue: string
}

export default function SearchPreview({
  isOpen,
  searchValue
}: SearchPreviewProps) {
  const { data: users } = useSearchUsersQuery({
    variables: { input: searchValue, limit: 3 }
  })
  const { data: charities } = useSearchCharitiesQuery({
    variables: { input: searchValue, limit: 3 }
  })
  const { data: events } = useSearchEventsQuery({
    variables: { input: searchValue, limit: 3 }
  })
  const router = useRouter()

  return (
    <Transition
      appear
      show={isOpen}
      enter="transition"
      enterFrom="-translate-y-2 opacity-0"
      enterTo="opacity-100"
      leave="transition"
      leaveFrom="opacity-100"
      leaveTo="-translate-y-2 opacity-0"
      as="dl"
      className="absolute z-10 w-full px-0 py-2 mt-12 shadow-lg divide"
    >
      {users && users.searchUsers?.items.length > 0 && (
        <div className="flex flex-col px-5 py-3">
          <h5>Users</h5>
          <div className="divide">
            {users.searchUsers.items.map((user) => (
              <div
                key={user.id}
                className="flex gap-3 py-3 clickable-float"
                onClick={() =>
                  router.push({
                    pathname: '/user',
                    query: { userId: user.id }
                  })
                }
              >
                <Picture pictureId={user.profile?.displayPicture} size={10} />
                <div className="flex flex-col">
                  <h6>
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h6>
                  <p>@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {charities && charities.searchCharities?.items.length > 0 && (
        <div className="flex flex-col px-5 py-3">
          <h5>Charities</h5>
          <div className="divide">
            {charities.searchCharities.items.map(
              (charity: CharityHeaderFragment) => (
                <div
                  key={charity.id}
                  className="flex items-center gap-3 py-3 clickable-float"
                  onClick={() =>
                    router.push({
                      pathname: '/charity',
                      query: { charityId: charity.id }
                    })
                  }
                >
                  <Picture
                    pictureId={charity.profile?.displayPicture}
                    size={10}
                  />
                  <div className="flex flex-col gap-1">
                    <h6>{charity.name}</h6>
                    <div className="flex gap-2 truncate">
                      {charity.categories.map((category) => (
                        <button
                          className="px-3 py-1 text-xs pointer-events-none button-secondary"
                          key={category.id}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
      {events && events.searchEvents?.items.length > 0 && (
        <div className="flex flex-col gap-3 px-5 py-3">
          <h5>Events</h5>
          <div className="space-y-3">
            {events.searchEvents.items.map((event: EventSnippetFragment) => (
              <div
                key={event.id}
                className="p-3 rounded-lg bordered clickable-float"
                onClick={() =>
                  router.push({
                    pathname: '/event',
                    query: { eventId: event.id }
                  })
                }
              >
                <EventSnippet event={event} />
              </div>
            ))}
          </div>
        </div>
      )}
      {(users?.searchUsers?.hasMore ||
        charities?.searchCharities?.hasMore ||
        events?.searchEvents?.hasMore) && (
        <Link
          href={{ pathname: '/search', query: { searchValue: searchValue } }}
        >
          <a className="px-5 py-3 text-base">
            <p>{events?.searchEvents?.hasMore}</p>
            View all search results
            <ArrowRightIcon />
          </a>
        </Link>
      )}
      {users?.searchUsers?.items?.length == 0 &&
        charities?.searchCharities?.items?.length == 0 &&
        events?.searchEvents?.items?.length == 0 && (
          <div className="px-5 py-2">
            <p>Sorry, nothing matches your search.</p>
          </div>
        )}
    </Transition>
  )
}
