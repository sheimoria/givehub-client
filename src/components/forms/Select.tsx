import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type SelectProps = {
  name: string
  label: string
  options: { name: string; label: string }[]
  register: UseFormRegister<FieldValues>
  errors: any
}

export default function Select({
  name,
  label,
  options,
  register,
  errors
}: SelectProps) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={name}>{label}</label>
      <select {...register(name)}>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <span className="flex gap-1 text-sm text-rose-600 dark:text-rose-600">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
