import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type InputProps = {
  name: string
  label?: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

export default function Input({
  name,
  label,
  placeholder,
  register,
  errors,
  onFocus,
  onBlur,
  className
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        placeholder={placeholder}
        {...register(name)}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
      />
      {errors && (
        <span className="flex gap-1 text-sm text-rose-600 dark:text-rose-600">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
