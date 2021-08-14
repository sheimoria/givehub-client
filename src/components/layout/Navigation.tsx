import { ClockIcon, HomeIcon, TrendingUpIcon } from '@heroicons/react/outline'

import Link from 'next/link'
import Transit from 'components/Transit'
import classNames from 'utils/classNames'
import { useRouter } from 'next/router'

const sorts = [
  { name: 'Trending', id: 'trending', icon: TrendingUpIcon },
  { name: 'Upcoming', id: 'upcoming', icon: ClockIcon }
]

const filters = [
  { name: 'Animal Welfare', id: '1' },
  { name: 'Arts and Heritage', id: '2' },
  { name: 'Children and Youth', id: '3' },
  { name: 'Community', id: '4' },
  { name: 'Disability', id: '5' },
  { name: 'Education', id: '6' },
  { name: 'Elderly', id: '7' },
  { name: 'Environment', id: '8' },
  { name: 'Families', id: '9' },
  { name: 'Health', id: '10' },
  { name: 'Humanitarian', id: '11' },
  { name: 'Social Service', id: '12' },
  { name: 'Sports', id: '13' },
  { name: 'Women and Girls', id: '14' }
]

export default function Navigation() {
  const router = useRouter()

  return (
    <div className="sticky w-44 top-5">
      <Transit>
        <div className="flex flex-col gap-3 divide">
          <div className="flex flex-col gap-2">
            {/* Home */}
            <Link
              href={{
                pathname: '/home'
              }}
            >
              <a
                className={classNames(
                  router.query.view === undefined
                    ? 'nav-active'
                    : 'nav-inactive',
                  'nav'
                )}
                aria-current={
                  router.query.view === undefined ? 'page' : undefined
                }
              >
                <HomeIcon />
                Home
              </a>
            </Link>
            {/* Trending, Upcoming */}
            {sorts.map((sort) => (
              <Link
                key={sort.id}
                href={{
                  pathname: '/home',
                  query: { view: sort.id }
                }}
              >
                <a
                  className={classNames(
                    sort.id === router.query.view
                      ? 'nav-active'
                      : 'nav-inactive',
                    'nav'
                  )}
                  aria-current={
                    sort.id === router.query.view ? 'page' : undefined
                  }
                >
                  {sort.icon && <sort.icon />}
                  {sort.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-3">
            {/* Categories */}
            {filters.map((filter) => (
              <Link
                key={filter.id}
                href={{
                  pathname: '/home',
                  query: { view: filter.id }
                }}
              >
                <a
                  className={classNames(
                    filter.id === router.query.view
                      ? 'nav-active'
                      : 'nav-inactive',
                    'nav'
                  )}
                  aria-current={
                    filter.id === router.query.view ? 'page' : undefined
                  }
                >
                  {filter.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Transit>
    </div>
  )
}
