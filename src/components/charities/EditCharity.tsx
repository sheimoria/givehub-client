import { PencilIcon } from '@heroicons/react/solid'
import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function Edit({ charity }) {
  const { data } = useMeQuery()
  const router = useRouter()

  if (data && data.me) {
    if (
      data.me.adminCharities.some(
        (charity) => charity.id === parseInt(router.query.id as string)
      )
    ) {
      return (
        <a
          onClick={() => router.push(`/charities/update/${charity.id}`)}
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
