import Body from 'components/layout/Body'
import CreateCharity from 'components/charities/CreateCharity'
import withAuth from 'utils/withAuth'
import React from 'react'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'
import PeopleToFollow from 'components/users/PeopleToFollow'
import CharitiesToFollow from 'components/users/CharitiesToFollow'

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
