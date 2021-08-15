import CreatePostModal from 'components/posts/CreatePostModal'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { UserPictureFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UserPost({ user }: { user: UserPictureFragment }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transit as="article" className="flex-row items-center">
        <Picture pictureId={user.profile?.displayPicture} />
        <span
          onClick={() => setIsOpen(true)}
          className="flex flex-auto text-sm text-gray-500 cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          New Post &hellip;
        </span>
      </Transit>
      {isOpen && <CreatePostModal setIsOpen={setIsOpen} />}
    </>
  )
}
