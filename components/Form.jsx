import Field from 'components/Field'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Form({ onSubmit, schema, options, extra }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema.validation)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{schema.label}</h3>
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
      {extra || <br />}
      <button type="submit">{schema.submitLabel}</button>
    </form>
  )
}
