import useLikeMutation from 'hooks/useLikeMutation'
import { useState } from 'react'
import { ThumbUpIcon } from '@heroicons/react/solid'
import classNames from 'utils/classNames'
import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function Like({ eventId, likeNumber }) {
  const { data, loading, error } = useMeQuery()
  const [liked, setLiked] = useState(false)
  const [like] = useLikeMutation()
  const router = useRouter()

  if (error) return <p>{error.message}</p>
  if (loading) return <div className="animate-spin" />
  if (data) {
    async function handleClick() {
      if (data.me) {
        like({ variables: { eventId: eventId } })
        setLiked(!liked)
      } else {
        router.push('/log-in')
      }
    }

    return (
      <div className="flex items-center gap-2">
        <ThumbUpIcon
          onClick={handleClick}
          className={classNames(
            liked ? 'text-rose-600' : 'text-gray-400',
            'w-5 h-5'
          )}
        />
        <p>{likeNumber}</p>
      </div>
    )
  }
  return null
}
