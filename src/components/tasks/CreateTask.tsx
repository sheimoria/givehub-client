import { PencilAltIcon } from '@heroicons/react/outline'
import { useCreateTaskMutation } from 'generated/graphql'

export default function CreateTask() {
  const [createTask] = useCreateTaskMutation()

  return (
    <button className="border-white rounded-lg dark:border-gray-800 dark:bg-gray-800 bg-gray-white">
      <PencilAltIcon />
      Create Task
    </button>
  )
}
