import { ReactElement } from 'react'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

import Link from 'next/link'

interface EditDeletePostButtonsProps {
  id: number
  creatorId: number
}

export function EditDeletePostButtons({
  id,
  creatorId
}): ReactElement<EditDeletePostButtonsProps> {
  const { data: meData } = useMeQuery()
  const [deletePost] = useDeletePostMutation()

  if (meData?.me?.id !== creatorId) return null

  return (
    <div className="flex gap-4">
      <Link href="{`/post/edit/${id}`}">
        <a>Edit post</a>
      </Link>
      <button
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: 'Post:' + id })
            }
          })
        }}
      >
        Delete post
      </button>
    </div>
  )
}
