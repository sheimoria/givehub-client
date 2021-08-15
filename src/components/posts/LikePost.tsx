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
          className="cursor-pointer text-rose-600"
        />
      ) : (
        <ThumbUpIconOutline
          onClick={() => like()}
          className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        />
      )}
      <p>
        {likePost.likeNumber} {likePost.likeNumber === 1 ? 'Like' : 'Likes'}
      </p>
    </div>
  )
}
