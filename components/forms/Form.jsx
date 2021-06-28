import Field from 'components/forms/Field'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Form({
  schema,
  defaultValues,
  options,
  onSubmit,
  extra
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema.validation)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>{schema.label}</h4>
      {schema.fields.map((field) => (
        <Field
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          options={options ? options : field.options}
          register={register}
          errors={errors[field.name]}
        />
      ))}
      {extra || <div />}
      <button type="submit">{schema.submitLabel}</button>
    </form>
  )
}
