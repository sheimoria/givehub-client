import Body from 'components/Body'
import Form from 'components/Form'
import { individualSelectCategories } from 'utils/formSchemas'
import { useRouter } from 'next/router'

export default function Categories() {
  const router = useRouter()
  function handleSubmit(data) {
    console.log(data)
    router.push('/signup/individual/select-charities')
  }

  return (
    <Body>
      <div className="flex justify-center">
        <Form onSubmit={handleSubmit} schema={individualSelectCategories} />
      </div>
    </Body>
  )
}
