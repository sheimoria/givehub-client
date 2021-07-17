import { LikeEventFragment, useLikeEventMutation } from 'generated/graphql'

import { ThumbUpIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpIconHollow } from '@heroicons/react/outline'

export default function LikeEvent({
  likeEvent
}: {
  likeEvent: LikeEventFragment
}) {
  const [like] = useLikeEventMutation({
    variables: { eventId: likeEvent.id }
  })

  return (
    <div className="flex items-center gap-2">
      {likeEvent.voteStatus === 1 ? (
        <ThumbUpIcon onClick={() => like()} className="text-rose-600" />
      ) : (
        <ThumbUpIconHollow onClick={() => like()} className="text-gray-600" />
      )}
      <p>{likeEvent.likeNumber}</p>
    </div>
  )
}
