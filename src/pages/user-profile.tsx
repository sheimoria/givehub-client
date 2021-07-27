import Body from 'components/Layout/Body'
import CreateUserProfile from 'components/Users/CreateUserProfile'
import { HeaderFragment } from 'generated/graphql'
import withAuth from 'utils/withAuth'

export default withAuth(function UserProfile({ me }: { me: HeaderFragment }) {
  console.log(me.email)

  return (
    <Body title="Sign up">
      <div className="flex flex-col justify-center flex-auto">
        <CreateUserProfile me={me} />
      </div>
    </Body>
  )
})
