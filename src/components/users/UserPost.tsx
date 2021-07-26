import CreatePost from 'components/posts/CreatePostModal'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { UserAvatarFragment } from 'generated/graphql'
import { useState } from 'react'

export default function UserPost({ user }: { user: UserAvatarFragment }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transit>
        <article className="flex-row">
          <Picture pictureId={user.profile?.displayPicture} size={10} />
          <input
            onClick={() => setIsOpen(true)}
            placeholder="New Post"
            className="flex-auto bg-gray-100 rounded-full dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          />
        </article>
      </Transit>
      <CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
