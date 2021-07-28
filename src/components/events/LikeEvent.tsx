import {
  EventLikesFragment,
  UserDocument,
  useLikeEventMutation
} from 'generated/graphql'

import { ThumbUpIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline'

export default function LikeEvent({ event }: { event: EventLikesFragment }) {
  const [likeEvent] = useLikeEventMutation({
    variables: { eventId: event.id },
    refetchQueries: [
      { query: UserDocument, variables: { userId: event.creator.id } }
    ]
  })

  return (
    <div className="flex items-center gap-2">
      {event.likeStatus ? (
        <ThumbUpIcon
          onClick={() => likeEvent()}
          className="transition-transform text-rose-600 dark:text-rose-600 hover:scale-110"
        />
      ) : (
        <ThumbUpIconOutline
          onClick={() => likeEvent()}
          className="transition-transform hover:scale-110"
        />
      )}
      <p>{event.likeNumber}</p>
    </div>
  )
}
