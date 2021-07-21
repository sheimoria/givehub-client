import { ReactNode } from 'react'
import { Transition } from '@headlessui/react'

type TransitProps = {
  onEveryMount?: boolean
  children: ReactNode
}

export default function Transit({ onEveryMount, children }: TransitProps) {
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
    >
      {children}
    </Transition>
  )
}
