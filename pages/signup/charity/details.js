import Body from 'components/Body'
import Form from 'components/Form'
import { charityDetails } from 'utils/formSchemas'
import { useRouter } from 'next/router'

export default function CharitySignUp() {
  const router = useRouter()
  function handleSubmit(data) {
    console.log(data)
    router.push('/signup/charity/success')
  }

  return (
    <Body title="Sign up as charity">
      <div className="flex flex-col items-center gap-2">
        <h3>Congratulations! You've been successfully verified!</h3>
        <p>
          Now please share with us more info about your charity so that others
          can get to know your cause better.
        </p>
      </div>
      <Form onSubmit={handleSubmit} schema={charityDetails} />
    </Body>
  )
}
