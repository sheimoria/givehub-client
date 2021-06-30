import Link from 'next/link'
import classNames from 'utils/classNames'
import { useRouter } from 'next/router'

const categories = [
  { name: 'All', id: 0 },
  { name: 'Animal Welfare', id: 1 },
  { name: 'Arts and Heritage', id: 2 },
  { name: 'Children and Youth', id: 3 },
  { name: 'Disability', id: 4 },
  { name: 'Education', id: 5 },
  { name: 'Elderly', id: 6 },
  { name: 'Environment', id: 7 },
  { name: 'Families', id: 8 },
  { name: 'Health', id: 9 },
  { name: 'Humanitarian', id: 10 },
  { name: 'Social Service', id: 11 },
  { name: 'Sports', id: '12' },
  { name: 'Women and Girls', id: 13 }
]

export default function Navigation() {
  const router = useRouter()
  const categoryId =
    router.pathname === '/' || router.pathname === '/[categoryId]'
      ? parseInt(router.query.categoryId as string) || 0
      : undefined

  return (
    <aside className="flex-none md:block">
      <div className="sticky flex flex-col gap-3 top-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.id === 0 ? '/' : `/${category.id}`}
          >
            <a
              className={classNames(
                category.id === categoryId
                  ? 'bg-white text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:bg-gray-800 dark:hover:text-gray-100 shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200',
                'py-3 px-5 rounded-lg'
              )}
              aria-current={category.id === categoryId ? 'page' : undefined}
            >
              {category.name}
            </a>
          </Link>
        ))}
      </div>
    </aside>
  )
}