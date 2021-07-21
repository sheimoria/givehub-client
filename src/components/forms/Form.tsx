import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import React, { ReactNode } from 'react'

type FormProps = {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit: (values: Object) => void
  className?: string
  children: ReactNode
}

export default function Form({
  handleSubmit,
  onSubmit,
  className,
  children
}: FormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  )
}
