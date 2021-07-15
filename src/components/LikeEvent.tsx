import {
  LikeEventFragment,
  useLikeEventMutation,
  useMeQuery
} from 'generated/graphql'

import { ThumbUpIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpIconHollow } from '@heroicons/react/outline'

export default function LikeEvent({
  likeEvent
}: {
  likeEvent: LikeEventFragment
}) {
  const [like] = useLikeEventMutation()

  return (
    <div className="flex items-center gap-2">
      {likeEvent.voteStatus === 1 ? (
        <ThumbUpIcon
          onClick={() =>
            like({
              variables: { eventId: likeEvent.id }
            })
          }
          className="text-rose-600"
        />
      ) : (
        <ThumbUpIconHollow
          onClick={() =>
            like({
              variables: { eventId: likeEvent.id }
            })
          }
          className="text-gray-600"
        />
      )}
      <p>{likeEvent.likeNumber}</p>
    </div>
  )
}
