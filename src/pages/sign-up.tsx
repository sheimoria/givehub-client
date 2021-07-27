import Body from 'components/Layout/Body'
import CreateUser from 'components/Users/CreateUser'
import { useState } from 'react'

export default function SignUp() {
  const [success, setSuccess] = useState(false)

  return (
    <Body title="Sign up">
      {!success ? (
        <div className="flex flex-col justify-center flex-auto">
          <CreateUser setSuccess={setSuccess} />
        </div>
      ) : (
        <div className="flex flex-col justify-center flex-auto gap-3 p-5">
          <h2>You&apos;ve successfully signed up!</h2>
          <p>
            Thank you for joining Givehub! Before you can log in, we need you to
            verify yourself by clicking the link in the email we just sent you.
            Cheers!
          </p>
        </div>
      )}
    </Body>
  )
}
