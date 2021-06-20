// first name last name email username password -> signup/individual/categories

import Body from 'components/Body'
import Form from 'components/Form'
import { individualSignUp } from 'utils/formSchemas'
import { useRouter } from 'next/router'

export default function IndividualSignUp() {
  const router = useRouter()
  function handleSubmit(data) {
    console.log(data)
    router.push('/signup/individual/select-categories')
  }

  return (
    <Body title="Sign up as individual">
      <div className="flex justify-center">
        <Form onSubmit={handleSubmit} schema={individualSignUp} />
      </div>
    </Body>
  )
}
