import { PencilAltIcon } from '@heroicons/react/outline'
import { PostInfoFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UpdatePostButton({ post }: { post: PostInfoFragment }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
    </>
  )
}
