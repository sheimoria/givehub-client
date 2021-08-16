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
    <div className="flex items-center gap-2 transition">
      {event.likeStatus ? (
        <ThumbUpIcon
          onClick={() => likeEvent()}
          className="cursor-pointer text-rose-600"
        />
      ) : (
        <ThumbUpIconOutline
          onClick={() => likeEvent()}
          className="text-gray-500 transition-colors cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        />
      )}
      <p>
        {event.likeNumber} {event.likeNumber === 1 ? 'Like' : 'Likes'}
      </p>
    </div>
  )
}
