import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type PasswordProps = {
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  errors: any
}

export default function Password({
  name,
  label,
  register,
  errors
}: PasswordProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} type="password" />
      {errors && (
        <span className="flex gap-1 text-sm text-rose-600 dark:text-rose-600">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
