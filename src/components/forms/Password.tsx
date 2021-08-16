import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import { ExclamationCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import useToggle from 'utils/useToggle'

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

export default function Password({
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
  const [visible, toggleVisible] = useToggle()

  return (
    <div className="flex flex-col flex-1 gap-2 transition">
      <label htmlFor={name} className={srOnly ? 'sr-only' : ''}>
        {label}
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-md focus:ring-1 focus:ring-rose-600 focus:outline-none dark:text-gray-200 dark:placeholder-gray-400 dark:bg-gray-700 ${className}`}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
          type={visible ? 'text' : 'password'}
        />
        <div className="absolute inset-y-0 right-0 flex items-end pb-2 pr-3">
          {errors ? (
            <ExclamationCircleIcon className="text-rose-600" />
          ) : visible ? (
            <EyeIcon onClick={toggleVisible} className="clickable" />
          ) : (
            <EyeOffIcon onClick={toggleVisible} className="clickable" />
          )}
        </div>
      </div>
      {errors && (
        <span className="text-xs text-rose-600">{errors.message}</span>
      )}
    </div>
  )
}
