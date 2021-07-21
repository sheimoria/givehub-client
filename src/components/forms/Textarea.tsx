import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type TextareaProps = {
  name: string
  label?: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
}

export default function Textarea({
  name,
  label,
  placeholder,
  register,
  errors,
  className
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className={className}
      ></textarea>
      {errors && (
        <span className="flex gap-2 text-sm text-red-500">
          <ExclamationCircleIcon className="w-5 h-5" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
