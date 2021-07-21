import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

type CheckboxProps = {
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  errors: any
}

export default function Checkbox({
  name,
  label,
  register,
  errors
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-4">
      <input type="checkbox" {...register(name)} />
      <label htmlFor={name}>{label}</label>
      {errors && (
        <span className="flex gap-2 text-sm text-red-500">
          <ExclamationCircleIcon className="w-5 h-5" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
