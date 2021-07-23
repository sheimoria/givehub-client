import Body from 'components/layout/Body'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'
import PeopleToFollow from 'components/users/PeopleToFollow'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import Transit from 'components/Transit'

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
          <PlusIcon className="items-center text-white" />
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
