import { PlusIcon } from '@heroicons/react/outline'
import Picture from 'components/Picture'
import {
  CharityHeaderFragment,
  useFollowCharityMutation
} from 'generated/graphql'
import Link from 'next/link'

export default function CharityHeader({
  charity
}: {
  charity: CharityHeaderFragment
}) {
  const [followCharity] = useFollowCharityMutation({
    variables: { charityId: charity.id }
  })
  return (
    <div className="flex flex-wrap justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Picture size={36} />
        <div className="flex flex-col">
          <Link
            href={{
              pathname: '/charity',
              query: { userId: charity.id }
            }}
          >
            <a className="truncate">{charity.name}</a>
          </Link>
          <p className="truncate">
            {charity.categories.map((category) => (
              <p key={category.id}>{category.name}</p>
            ))}
          </p>
        </div>
      </div>
      <button onClick={() => followCharity()}>
        <PlusIcon />
        Follow
      </button>
    </div>
  )
}
