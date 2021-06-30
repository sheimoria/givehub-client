import { ThumbUpIcon } from '@heroicons/react/solid'
import classNames from 'utils/classNames'
import useLikeMutation from 'hooks/useLikeMutation'
import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function Like({ eventId, likeStatus, likeNumber }) {
  const { data, loading, error } = useMeQuery()
  const [like] = useLikeMutation()
  const router = useRouter()

  if (error) return <p>{error.message}</p>
  if (loading) return <div className="animate-spin" />
  if (data) {
    function handleClick() {
      if (data.me) {
        like({ variables: { eventId: eventId } })
      } else {
        router.push('/log-in')
      }
    }

    return (
      <div className="flex items-center gap-2">
        <ThumbUpIcon
          onClick={handleClick}
          className={classNames(
            likeStatus === 1 ? 'text-rose-600' : 'text-gray-400',
            'w-5 h-5'
          )}
        />
        <p>{likeNumber}</p>
      </div>
    )
  }
  return null
}
