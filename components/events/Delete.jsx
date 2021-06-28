
export default function Delete({ eventId, eventCharityId }) {
  const { data } = useMeQuery()
  const router = useRouter()
  const [deleteEvent] = useDeleteEventMutation()
  async function handleClick() {
    const response = await deleteEvent({ variables: { id: eventId } })
    if (response.data.deleteEvent.errors) {
      console.log(response.data.deleteEvent.errors)
    } else if (response.data.deleteEvent.success) {
      router.back()
    }
  }

  if (data && data.me) {
    if (
      data.me.createdCharities.some((charity) => charity.id === eventCharityId)
    ) {
      return (
        <a
          onClick={handleClick}
          className="text-gray-500 hover:text-gray-600 focus:text-gray-700"
        >
          <TrashIcon className="w-5 h-5" />
          Delete
        </a>
      )
    }
    return null
  }
  return null
}
