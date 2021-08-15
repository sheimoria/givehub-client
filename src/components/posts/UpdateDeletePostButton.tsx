import { PencilAltIcon } from '@heroicons/react/outline'
import { PostInfoFragment } from 'generated/graphql'
import UpdateDeletePostModal from './UpdateDeletePostModal'
import { useState } from 'react'

export default function UpdateDeletePostButton({
  post
}: {
  post: PostInfoFragment
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PencilAltIcon className="clickable" onClick={() => setIsOpen(true)} />
      {isOpen && <UpdateDeletePostModal setIsOpen={setIsOpen} post={post} />}
    </>
  )
}
