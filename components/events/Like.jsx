import useLikeMutation from 'hooks/useLikeMutation'
import { useState } from 'react'
import { ThumbUpIcon } from '@heroicons/react/solid'
import classNames from 'utils/classNames'

export default function Like({ eventId, likeNumber }) {
  const [liked, setLiked] = useState(false)
  const [like] = useLikeMutation()
  async function handleClick() {
    like({ variables: { eventId: eventId } })
    setLiked(!liked)
  }
  return (
    <div className="flex items-center gap-2">
      <ThumbUpIcon
        onClick={handleClick}
        className={classNames(
          liked ? 'text-rose-600' : 'text-gray-400',
          'w-5 h-5'
        )}
      />
      <p>{likeNumber}</p>
    </div>
  )
}
