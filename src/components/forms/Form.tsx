import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'

import { ReactNode } from 'react'

type FormProps = {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit: (values: any) => void
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
