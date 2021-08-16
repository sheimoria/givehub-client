import Body from 'components/layout/Body'
import CreateUser from 'components/users/CreateUser'
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
        <section className="justify-center flex-auto p-6">
          <h2>You&apos;ve successfully signed up!</h2>
          <span className="text-gray-700 dark:text-gray-200">
            Thank you for joining Givehub! Before you can log in, we need you to
            verify yourself by clicking the link in the email we just sent you.
            Cheers!
          </span>
        </section>
      )}
    </Body>
  )
}
