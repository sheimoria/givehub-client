import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function CharityActions({ id }) {
  const { data } = useMeQuery()
  const router = useRouter()

  if (data && data.me) {
    if (data.me.adminCharities.some((charity) => charity.id === id)) {
      return (
        <section className="flex-row p-6 ">
          <button
            className="flex-1"
            onClick={() => router.push(`/events/create/${id}`)}
          >
            Create Event
          </button>
          <button disabled className="flex-1">
            Create Post
          </button>
        </section>
      )
    }
    return null
  }
  return null
}
