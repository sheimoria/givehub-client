import { ReactNode } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'

type FormProps = {
  handleSubmit: UseFormHandleSubmit<any>
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
