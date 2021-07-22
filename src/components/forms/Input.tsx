import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type InputProps = {
  name: string
  label?: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
}

export default function Input({
  name,
  label,
  placeholder,
  register,
  errors,
  className
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        placeholder={placeholder}
        {...register(name)}
        className={className}
      />
      {errors && (
        <span className="flex gap-2 text-sm text-red-500">
          <ExclamationCircleIcon className="w-5 h-5" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
