import 'react-datepicker/dist/react-datepicker.css'

import { Control, Controller, FieldValues } from 'react-hook-form'

import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

type DatetimeProps = {
  name: string
  label: string
  errors: any
  control: Control<FieldValues>
}

export default function Datetime({
  name,
  label,
  errors,
  control
}: DatetimeProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label htmlFor={name}>{label}</label>
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
            className="text-gray-600 bg-gray-100 border-none rounded-lg dark:bg-gray-700"
          />
        )}
      />
      {errors && (
        <span className="flex gap-2 text-sm text-red-500">
          <ExclamationCircleIcon className="w-5 h-5" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
