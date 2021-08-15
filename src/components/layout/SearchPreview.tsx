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
      className="absolute z-10 w-full mt-4 shadow"
    >
      {users && users.searchUsers?.items.length > 0 && (
        <>
          <h5>Users</h5>
          {users.searchUsers.items.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4"
              onClick={() =>
                router.push({
                  pathname: '/user',
                  query: { userId: user.id }
                })
              }
            >
              <Picture pictureId={user.profile?.displayPicture} />
              <div className="flex flex-col">
                <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
                  {user.profile?.firstName} {user.profile?.lastName}
                </h6>
                <span className="text-xs text-rose-600">@{user.username}</span>
              </div>
            </div>
          ))}
        </>
      )}
      {charities && charities.searchCharities?.items.length > 0 && (
        <>
          <h5>Charities</h5>
          {charities.searchCharities.items.map(
            (charity: CharityHeaderFragment) => (
              <div
                key={charity.id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: '/charity',
                    query: { charityId: charity.id }
                  })
                }
              >
                <Picture pictureId={charity.profile?.displayPicture} />
                <div className="flex flex-col">
                  <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
                    {charity.name}
                  </h6>
                  <div className="flex gap-2">
                    {charity.categories.map((category) => (
                      <span className="text-xs text-rose-600" key={category.id}>
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
      {events && events.searchEvents?.items.length > 0 && (
        <>
          <h5>Events</h5>
          {events.searchEvents.items.map((event: EventSnippetFragment) => (
            <EventSnippet key={event.id} event={event} />
          ))}
        </>
      )}
      {(users?.searchUsers?.hasMore ||
        charities?.searchCharities?.hasMore ||
        events?.searchEvents?.hasMore) && (
        <Link
          href={{ pathname: '/search', query: { searchValue: searchValue } }}
        >
          <a className="flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100">
            View all search results
            <ArrowRightIcon />
          </a>
        </Link>
      )}
      {users?.searchUsers?.items?.length == 0 &&
        charities?.searchCharities?.items?.length == 0 &&
        events?.searchEvents?.items?.length == 0 && (
          <p>Sorry, nothing matches your search.</p>
        )}
    </Transition>
  )
}
