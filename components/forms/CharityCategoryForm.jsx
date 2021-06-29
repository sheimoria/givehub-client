import Field from 'components/forms/Field'
import { charityCategorySchema } from 'utils/formSchemas'
import useCharityCategoryMutation from 'hooks/useCharityCategoryMutation'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CharityCategoryForm() {
  const [charityCategory] = useCharityCategoryMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({ resolver: yupResolver(charityCategorySchema.validation) })
  const router = useRouter()
  async function onSubmit(values) {
    const response = await charityCategory({
        variables: { uen: router.query.id, categories: values.categories }
      })
      if (response.data.updateCharityCategories.errors) {
       
        response.data.updateCharityCategories.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else if (response.data.updateCharityCategories.success) {
        router.replace(charities)
  }

  return (
    <main>
      <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="-mb-1">{charityCategorySchema.label}</h4>
        {charityCategorySchema.fields.map((field) => (
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
    </main>
  )
}
