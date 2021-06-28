import { PencilIcon } from '@heroicons/react/solid'
import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function Edit({ event }) {
  const { data } = useMeQuery()
  const router = useRouter()

  if (data && data.me) {
    if (
      data.me.createdCharities.some(
        (charity) => charity.id === event.charity.id
      )
    ) {
      return (
        <a
          onClick={() =>
            router.push({
              pathname: `/events/update/${event.id}`,
              query: {
                id: event.id,
                name: event.name,
                description: event.description,
                dateStart: event.dateStart,
                dateEnd: event.dateEnd
              }
            })
          }
          className="text-gray-400 hover:text-gray-500 focus:text-gray-600"
        >
          <PencilIcon className="w-5 h-5" />
        </a>
      )
    }
    return null
  }
  return null
}
