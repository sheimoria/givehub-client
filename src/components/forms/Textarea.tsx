import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type TextareaProps = {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  errors: any
  className?: string
  srOnly?: boolean
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
      <div className="relative">
        <textarea
          placeholder={placeholder}
          {...register(name)}
          className={className}
        ></textarea>
        {errors && (
          <div className="absolute inset-y-0 right-0 flex items-end pb-4 pr-3 pointer-events-none">
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
