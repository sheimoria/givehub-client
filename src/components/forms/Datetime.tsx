import 'react-datepicker/dist/react-datepicker.css'

import { Control, Controller } from 'react-hook-form'

import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

type DatetimeProps = {
  name: string
  label: string
  errors: any
  control: Control<any>
  srOnly?: boolean
  className?: string
  placeholder?: string
}

export default function Datetime({
  name,
  label,
  errors,
  control,
  srOnly,
  className,
  placeholder
}: DatetimeProps) {
  return (
    <div className="relative flex flex-col flex-1 gap-2 transition">
      <label htmlFor={name} className={srOnly ? 'sr-only' : undefined}>
        {label}
      </label>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="d MMM yyyy, h:mm aa"
              className={
                'w-full text-sm bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-1 focus:ring-rose-600 focus:border-rose-600 border border-gray-200 dark:border-gray-700' +
                className
              }
              placeholderText={placeholder}
              wrapperClassName="w-full"
            />
          )}
        />
        {errors && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
