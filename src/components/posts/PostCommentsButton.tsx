import { ChatAltIcon } from '@heroicons/react/outline'

type Props = {
  toggleComments: () => void
  commentNumber: number
}

export default function PostCommentsButton({
  toggleComments,
  commentNumber
}: Props) {
  return (
    <div className="flex gap-2">
      <ChatAltIcon
        onClick={() => toggleComments()}
        className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      />
      <p>
        {commentNumber} {commentNumber === 1 ? 'Comment' : 'Comments'}
      </p>
    </div>
  )
}
