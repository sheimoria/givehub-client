import Body from 'components/Layout/Body'
import CharitiesToFollow from 'components/Users/CharitiesToFollow'
import CreateCharity from 'components/Charities/CreateCharity'
import FriendRequests from 'components/Users/FriendRequests'
import PeopleToFollow from 'components/Users/PeopleToFollow'
import UserTasks from 'components/Users/YourEvents'
import withAuth from 'utils/withAuth'

export default withAuth(function CharitySignUp({ me }) {
  return (
    <Body
      title="Sign up as charity"
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
      <CreateCharity />
    </Body>
  )
})
