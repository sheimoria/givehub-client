import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import { PlusIcon } from '@heroicons/react/outline'
import Transit from 'components/Transit'
import UserEvents from 'components/users/YourEvents'
import router from 'next/router'
import withAuth from 'utils/withAuth'
import Picture from 'components/Picture'

export default withAuth(function Charities({ me }) {
  return (
    <Body
      title="Charities"
      me={me}
      aside={
        <>
          <FriendRequests />
          <UserEvents />
          <PeopleToFollow />
          <CharitiesToFollow />
        </>
      }
    >
      <Transit as="article" className="px-6 pb-6 place-items-start">
        <h5>My Charities</h5>
        {me.adminCharities.map((charity) => (
          <div
            key={charity.id}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              router.push({
                pathname: '/charity',
                query: { charityId: charity.id }
              })
            }
          >
            <Picture pictureId={charity.profile?.displayPicture} />
            <div className="flex flex-col">
              <h6 className="hover:text-gray-800 dark:hover:text-gray-100 line-clamp-1">
                {charity.name}
              </h6>
              <p className="text-xs text-rose-600 dark:text-rose-600">
                {charity.categories.map((category) => category.name + ' ')}
              </p>
            </div>
          </div>
        ))}
        <button
          onClick={() => router.push('/charity-sign-up')}
          className="btn-primary"
        >
          <PlusIcon />
          Add Charity
        </button>
      </Transit>
    </Body>
  )
})
