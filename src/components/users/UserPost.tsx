import CreatePostModal from 'components/posts/CreatePostModal'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { UserPictureFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UserPost({ user }: { user: UserPictureFragment }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transit>
        <article className="flex-row">
          <Picture pictureId={user.profile?.displayPicture} size={10} />
          <span
            onClick={() => setIsOpen(true)}
            className="flex items-center flex-auto px-4 text-sm text-gray-400 transition bg-gray-100 rounded-full bordered dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            New Post
          </span>
        </article>
      </Transit>
      {isOpen && <CreatePostModal setIsOpen={setIsOpen} />}
    </>
  )
}
