import { ReactNode } from 'react'
import { Transition } from '@headlessui/react'

type TransitProps = {
  onEveryMount?: boolean
  as?: any
  onClick?: () => void
  onSubmit?: () => void
  className?: string
  children: ReactNode
}

export default function Transit({
  onEveryMount,
  as,
  onClick,
  onSubmit,
  className,
  children
}: TransitProps) {
  return (
    <Transition
      appear={onEveryMount}
      show={true}
      enter="transition duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100"
      leave="transition duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 translate-y-2"
      className={className}
      as={as}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </Transition>
  )
}
