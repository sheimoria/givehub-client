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
          className="clickable-scale text-rose-600 dark:text-rose-600"
        />
      ) : (
        <ThumbUpIconOutline
          onClick={() => like()}
          className="clickable-scale"
        />
      )}
      <p>{likePost.likeNumber}</p>
    </div>
  )
}
