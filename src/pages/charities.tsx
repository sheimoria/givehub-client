import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import { PlusIcon } from '@heroicons/react/outline'
import Transit from 'components/Transit'
import UserTasks from 'components/Users/YourEvents'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h5>My Charities</h5>
        <button onClick={() => router.push('/charity-sign-up')}>
          <PlusIcon className="items-center text-white dark:text-white" />
          Add Charity
        </button>
      </div>

      {me.adminCharities.map((charity) => (
        <Transit
          as="article"
          key={charity.id}
          onClick={() =>
            router.push({
              pathname: '/charity',
              query: { charityId: charity.id }
            })
          }
        >
          {charity.name}
        </Transit>
      ))}
    </Body>
  )
})
