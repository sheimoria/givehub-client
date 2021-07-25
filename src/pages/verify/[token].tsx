import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import { useVerifyUserMutation } from 'generated/graphql'

export default function VerifyEmail() {
  const [verifyUser] = useVerifyUserMutation()
  const router = useRouter()

  return (
    <Body title="Forgot password">
      <div>
        <p>Press the button below to complete the verification process:</p>
        <button
          onClick={() =>
            verifyUser({
              variables: { token: router.query.token as string }
            })
          }
        >
          Verify My Account
        </button>
      </div>
    </Body>
  )
}
