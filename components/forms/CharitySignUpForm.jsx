import Field from 'components/forms/Field'
import { charitySignUpSchema } from 'utils/formSchemas'
import useCharityCategoryMutation from 'hooks/useCharityCategoryMutation'
import useCharitySignUpMutation from 'hooks/useCharitySignUpMutation'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CharitySignUpForm() {
  const [charitySignUp] = useCharitySignUpMutation()
  const [charityCategory] = useCharityCategoryMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({ resolver: yupResolver(charitySignUpSchema.validation) })
  const router = useRouter()
  async function onSubmit(values) {
    const response = await charitySignUp({
      variables: {
        options: {
          uen: values.uen,
          name: values.name,
          physicalAddress: values.physicalAddress,
          postalcode: values.postalCode
        }
      }
    })
    console.log(response)
    if (response.data.createCharity.errors) {
      response.data.createCharity.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else if (response.data.createCharity.success) {
      const responseToo = await charityCategory({
        variables: {
          charityId: response.data.createCharity.charity.id,
          categories: { categories: values.categories }
        }
      })
      console.log(responseToo)
      if (responseToo.data.updateCharityCategories.errors) {
        responseToo.data.updateCharityCategories.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else if (responseToo.data.updateCharityCategories.success) {
        router.replace(`/charities/${response.data.createCharity.charity.id}`)
      }
    }
  }

  return (
    <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="-mb-1">{charitySignUpSchema.label}</h4>
      {charitySignUpSchema.fields.map((field) => (
        <Field
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          options={field.options}
          register={register}
          errors={errors[field.name]}
        />
      ))}
      <div />
      <button type="submit">Sign Up</button>
    </form>
  )
}
