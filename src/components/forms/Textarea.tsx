import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type TextareaProps = {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
  srOnly: boolean
}

export default function Textarea({
  name,
  label,
  placeholder,
  register,
  errors,
  className,
  srOnly
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={srOnly ? 'sr-only' : undefined}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className={className}
      ></textarea>
      {errors && (
        <span className="absolute flex gap-1 text-sm text-rose-600 dark:text-rose-600 inset-1/2">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
