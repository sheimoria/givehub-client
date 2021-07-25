import Body from 'components/layout/Body'
import CreateUserProfile from 'components/users/CreateUserProfile'
import { HeaderFragment } from 'generated/graphql'
import withAuth from 'utils/withAuth'

export default withAuth(function UserProfile({ me }: { me: HeaderFragment }) {
  return (
    <Body title="Sign up">
      <div className="flex flex-col justify-center flex-auto">
        <CreateUserProfile me={me} />
      </div>
    </Body>
  )
})
