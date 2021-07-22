import { PostLikesFragment, useLikePostMutation } from 'generated/graphql'

import { ThumbUpIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline'

export default function LikePost({
  likePost
}: {
  likePost: PostLikesFragment
}) {
  const [like] = useLikePostMutation({
    variables: { postId: likePost.id }
  })

  return (
    <div className="flex items-center gap-2">
      {likePost.likeStatus ? (
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
      <p>{likePost.likeNumber}</p>
    </div>
  )
}