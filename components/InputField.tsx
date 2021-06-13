import { InputHTMLAttributes, ReactElement } from 'react'

import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}

export default function InputField({
  label,
  textarea,
  size: _,
  ...props
}): ReactElement<InputFieldProps> {
  const [field, { error }] = useField(props)
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      {textarea ? (
        <input type="textarea" {...field} {...props} id={field.name} />
      ) : (
        <input type="text" {...field} {...props} id={field.name} />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  )
}
