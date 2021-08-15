import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { UseFormRegister } from 'react-hook-form'

type Props = {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
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
}: Props) {
  return (
    <div className="flex flex-col flex-1 gap-2 transition">
      <label htmlFor={name} className={srOnly ? 'sr-only' : ''}>
        {label}
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          {...register(name)}
          className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 rounded-md focus:ring-1 focus:ring-rose-600 focus:outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-gray-700"
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
        {errors && (
          <div className="absolute inset-y-0 right-0 flex items-end pb-2 pr-3 pointer-events-none">
            <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          </div>
        )}
      </div>
      {errors && (
        <span className="text-sm text-rose-600 dark:text-rose-600">
          {errors.message}
        </span>
      )}
    </div>
  )
}
