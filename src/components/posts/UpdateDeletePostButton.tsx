import { PencilAltIcon } from '@heroicons/react/outline'
import { PostInfoFragment } from 'generated/graphql'
import UpdateDeletePostModal from './UpdateDeletePostModal'
import useToggle from 'utils/useToggle'

export default function UpdateDeletePostButton({
  post
}: {
  post: PostInfoFragment
}) {
  const [isOpen, toggleIsOpen] = useToggle()
  return (
    <>
      <PencilAltIcon className="clickable" onClick={toggleIsOpen} />
      {isOpen && (
        <UpdateDeletePostModal toggleIsOpen={toggleIsOpen} post={post} />
      )}
    </>
  )
}
