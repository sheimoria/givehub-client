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
        <span
          onClick={toggleIsOpen}
          className="flex flex-auto text-sm text-gray-500 cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          New Post &hellip;
        </span>
      </Transit>
      {isOpen && <CreatePostModal toggleIsOpen={toggleIsOpen} />}
    </>
  )
}
