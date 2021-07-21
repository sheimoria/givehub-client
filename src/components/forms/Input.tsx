import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type InputProps = {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
}

export default function Input({
  name,
  label,
  placeholder,
  register,
  errors
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label htmlFor={name}>{label}</label>
      <input placeholder={placeholder} {...register(name)} />
      {errors && (
        <span className="flex gap-2 text-sm text-red-500">
          <ExclamationCircleIcon className="w-5 h-5" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
