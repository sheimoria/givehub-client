import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { formatDistanceToNow } from 'date-fns'
import { usePostCommentsQuery } from 'generated/graphql'
import router, { useRouter } from 'next/router'

export default function PostCardComments({ postId }: { postId: number }) {
  const { data } = usePostCommentsQuery({
    variables: { depth: null, limit: 3, postId: postId }
  })

  return (
    <div className="flex flex-col gap-4">
      {data?.postComments.items.map((comment) => (
        <Transit onEveryMount key={comment.id} className="flex gap-4">
          <Picture
            pictureId={comment.author?.profile?.displayPicture}
            onClick={() =>
              router.push({
                pathname: '/user',
                query: { userId: comment.author?.id }
              })
            }
          />
          <div className="flex flex-col flex-1 gap-2 p-4 bg-gray-100 rounded-md dark:bg-gray-700">
            <div>
              <h6>
                {comment.author?.profile?.firstName}{' '}
                {comment.author?.profile?.lastName}
              </h6>
              <p className="text-xs">
                {formatDistanceToNow(parseInt(comment.createdAt), {
                  addSuffix: true,
                  includeSeconds: true
                })}
              </p>
            </div>
            <p>{comment.text}</p>
          </div>
        </Transit>
      ))}
    </div>
  )
}
