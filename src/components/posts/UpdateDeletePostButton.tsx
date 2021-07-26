import { PencilAltIcon } from '@heroicons/react/outline'
import { PostInfoFragment } from 'generated/graphql'
import { useState } from 'react'
import UpdateDeletePostModal from './UpdateDeletePostModal'

export default function UpdateDeletePostButton({
  post
}: {
  post: PostInfoFragment
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon
        className="clickable-scale"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && <UpdateDeletePostModal setIsOpen={setIsOpen} post={post} />}
    </>
  )
}
