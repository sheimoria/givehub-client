import { Transition } from '@headlessui/react'

export default function SearchPreview({ isOpen }: { isOpen: boolean }) {
  return (
    <Transition
      appear
      show={isOpen}
      enter="transition"
      enterFrom="-translate-y-2 opacity-0"
      enterTo="opacity-100"
      leave="transition"
      leaveFrom="opacity-100"
      leaveTo="-translate-y-2 opacity-0"
      as="dl"
      className="absolute z-10 w-full p-5 mt-3 shadow-md divide"
    >
      <p>Sorry, nothing matches your search.</p>
    </Transition>
  )
}
