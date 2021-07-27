import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { UseFormRegister } from 'react-hook-form'

type CheckboxProps = {
  name: string
  label: string
  register: UseFormRegister<any>
  errors?: any
}

export default function Checkbox({
  name,
  label,
  register,
  errors
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <input type="checkbox" {...register(name)} />
      <label htmlFor={name} className="font-normal">
        {label}
      </label>
      {errors && (
        <span className="flex gap-1 text-sm text-rose-600 dark:text-rose-600">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
