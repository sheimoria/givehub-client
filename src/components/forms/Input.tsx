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
  srOnly?: boolean
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
  srOnly,
  className
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {label && (
        <label htmlFor={name} className={srOnly ? 'sr-only' : ''}>
          {label}
        </label>
      )}
      <div className="relative transition">
        <input
          placeholder={placeholder}
          {...register(name)}
          className={className}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
        {errors && (
          <div className="absolute inset-y-0 right-0 flex items-end pb-2 pr-3 pointer-events-none">
            <span className="flex gap-1 text-sm text-rose-600 dark:text-rose-600">
              {errors.message}
              <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
