import Body from 'components/layout/Body'
import CreateCharity from 'components/charities/CreateCharity'
import withAuth from 'utils/withAuth'

export default withAuth(function CharitySignUp({ me }) {
  return (
    <Body title="Sign up as charity" me={me}>
      <CreateCharity />
    </Body>
  )
})
