import CreatePostModal from 'components/posts/CreatePostModal'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { UserPictureFragment } from 'generated/graphql'
import useToggle from 'utils/useToggle'

export default function UserPost({ user }: { user: UserPictureFragment }) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit as="article" className="flex-row items-center px-6 pb-6">
        <Picture pictureId={user.profile?.displayPicture} />
        <button
          onClick={toggleIsOpen}
          className="flex flex-1 px-4 py-2 text-sm text-gray-500 transition-colors bg-gray-100 rounded-md dark:hover:bg-gray-600 hover:bg-gray-200 dark:bg-gray-700 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          New Post
        </button>
      </Transit>
      {isOpen && <CreatePostModal toggleIsOpen={toggleIsOpen} />}
    </>
  )
}
