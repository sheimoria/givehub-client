import Body from 'components/layout/Body'
import CreateUser from 'components/users/CreateUser'
import { useState } from 'react'

export default function SignUp() {
  const [success, setSuccess] = useState(false)

  return (
    <Body title="Sign up">
      {success ? (
        <div className="flex flex-col items-start justify-center flex-auto gap-3 p-5">
          <h2>You&apos;re successfully signed up!</h2>
          <p>
            Thank you for joining Givehub! But before you can log in, we need
            you to verify yourself by clicking the link in the email we just
            sent you. Cheers!
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-auto">
          <CreateUser setSuccess={setSuccess} />
        </div>
      )}
    </Body>
  )
}
