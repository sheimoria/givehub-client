import Body from 'components/layout/Body'
import CharitiesToFollow from 'components/users/CharitiesToFollow'
import CreateCharity from 'components/charities/CreateCharity'
import FriendRequests from 'components/users/FriendRequests'
import PeopleToFollow from 'components/users/PeopleToFollow'
import UserEvents from 'components/users/UserEvents'
import withAuth from 'utils/withAuth'

export default withAuth(function CharitySignUp({ me }) {
  return (
    <Body
      title="Sign up as charity"
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
      <CreateCharity />
    </Body>
  )
})
