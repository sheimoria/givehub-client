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
        className="clickable-scale"
      />
      <p>{commentNumber}</p>
    </div>
  )
}
