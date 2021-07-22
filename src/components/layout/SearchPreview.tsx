import {
  CharityHeaderFragment,
  EventHeaderFragment,
  useSearchCharitiesQuery,
  useSearchEventsQuery,
  useSearchUsersQuery
} from 'generated/graphql'

import { ArrowRightIcon } from '@heroicons/react/outline'
import EventHeader from 'components/events/EventHeader'
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
    variables: { input: searchValue }
  })
  const { data: charities } = useSearchCharitiesQuery({
    variables: { input: searchValue }
  })
  const { data: events } = useSearchEventsQuery({
    variables: { input: searchValue }
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
    >
      <dl className="absolute z-10 w-full px-0 py-2 mt-3 shadow-md divide">
        <div className="flex flex-col gap-3 px-5 py-3">
          <h5>Users</h5>
          {users && searchValue != '' && (
            <div className="-my-3 divide">
              {users.searchUsers.items.map((user) => (
                <div key={user.id} className="flex gap-3 py-3">
                  <Picture size={36} />
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
          {charities && searchValue != '' && (
            <div className="-my-3 divide">
              {charities.searchCharities.items.map(
                (charity: CharityHeaderFragment) => (
                  <div key={charity.id} className="flex gap-3 py-3">
                    <Picture size={36} />
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
          {events && searchValue != '' && (
            <div className="space-y-3">
              {events.searchEvents.items.map(
                (eventHeader: EventHeaderFragment) => (
                  <div
                    key={eventHeader.id}
                    className="p-3 border border-gray-200 rounded-lg dark:border-gray-700"
                  >
                    <EventHeader eventHeader={eventHeader} />
                  </div>
                )
              )}
            </div>
          )}
        </div>
        {users && charities && events && searchValue != '' && (
          <Link
            href={{ pathname: '/search', query: { searchValue: searchValue } }}
          >
            <a className="px-5 py-3 text-base">
              View all search results
              <ArrowRightIcon />
            </a>
          </Link>
        )}
      </dl>
    </Transition>
  )
}
