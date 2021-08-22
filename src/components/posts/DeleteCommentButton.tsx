import {
  PostCommentsDocument,
  useDeleteCommentMutation
} from 'generated/graphql'

import { TrashIcon } from '@heroicons/react/outline'

type Props = {
  commentId: number
  postId: number
}

export default function DeleteCommentButton({ commentId, postId }: Props) {
  const [deleteComment] = useDeleteCommentMutation({
    variables: { commentId: commentId },
    refetchQueries: [
      {
        query: PostCommentsDocument,
        variables: {
          depth: null,
          limit: 10,
          postId: postId
        }
      }
    ]
  })

  return <TrashIcon onClick={() => deleteComment()} className="clickable" />
}
