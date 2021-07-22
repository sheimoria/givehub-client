import Body from 'components/layout/Body'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'
import PeopleToFollow from 'components/users/PeopleToFollow'
import CharitiesToFollow from 'components/users/CharitiesToFollow'

export default withAuth(function Charities({ me }) {
  const router = useRouter()

  return (
    <Body
      title="Charities"
      me={me}
      aside={
        <>
          <FriendRequests />
          <UserTasks />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      <article>
        <div className="flex flex-wrap justify-between gap-4">
          <h5>My Charities</h5>
          <Link href="/charity-sign-up">
            <a>
              <PlusIcon />
              Add Charity
            </a>
          </Link>
        </div>

        {me.adminCharities.map((charity) => (
          <article
            key={charity.id}
            onClick={() =>
              router.push({
                pathname: '/charity',
                query: { charityId: charity.id }
              })
            }
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200"
          >
            {charity.name}
          </article>
        ))}
      </article>
    </Body>
  )
})
