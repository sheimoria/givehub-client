import Body from 'components/Body'
import Form from 'components/Form'
import { charityVerification } from 'utils/formSchemas'
import { useRouter } from 'next/router'

export default function CharitySignUp() {
  const router = useRouter()
  function handleSubmit(data) {
    console.log(data)
    router.push('/signup/charity/details')
  }
  const uenLink = (
    <a
      href="https://sleek.com/sg/resources/what-is-uen-in-singapore/"
      target="_blank"
    >
      What's my UEN?
    </a>
  )

  return (
    <Body title="Sign up as charity">
      <div className="flex justify-center">
        <Form
          onSubmit={handleSubmit}
          schema={charityVerification}
          extra={uenLink}
        />
      </div>
    </Body>
  )
}
