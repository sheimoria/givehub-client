import Body from 'components/layout/Body'
import CreateUserProfile from 'components/users/CreateUserProfile'
import { HeaderFragment } from 'generated/graphql'
import withAuth from 'utils/withAuth'

export default withAuth(function SignUpProfile({ me }: { me: HeaderFragment }) {
  return (
    <Body title="Sign up">
      <CreateUserProfile me={me} />
    </Body>
  )
})
