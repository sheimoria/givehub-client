import { EventLikesFragment, useLikeEventMutation } from 'generated/graphql'

import { ThumbUpIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline'

export default function LikeEvent({
  likeEvent
}: {
  likeEvent: EventLikesFragment
}) {
  const [like] = useLikeEventMutation({
    variables: { eventId: likeEvent.id }
  })

  return (
    <div className="flex items-center gap-2">
      {likeEvent.likeStatus ? (
        <ThumbUpIcon
          onClick={() => like()}
          className="transition-transform text-rose-600 dark:text-rose-600 hover:scale-110"
        />
      ) : (
        <ThumbUpIconOutline
          onClick={() => like()}
          className="transition-transform hover:scale-110"
        />
      )}
      <p>{likeEvent.likeNumber}</p>
    </div>
  )
}
