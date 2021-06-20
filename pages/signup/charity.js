import Body from 'components/Body'
import Form from 'components/Form'
import Link from 'next/link'
import { charitySignUp } from 'utils/formSchemas'
import { useRouter } from 'next/router'

export default function CharitySignUp() {
  const router = useRouter()
  function handleSubmit(data) {
    console.log(data)
    router.push('/signup/charity/verification')
  }
  const loginLink = (
    <Link href="/login">
      <a>Already have an account?</a>
    </Link>
  )

  return (
    <Body title="Sign up as charity">
      <div className="flex justify-center">
        <Form
          onSubmit={handleSubmit}
          schema={charitySignUp}
          extra={loginLink}
        />
      </div>
    </Body>
  )
}
