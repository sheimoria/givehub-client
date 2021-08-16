import {
  EventTasksDocument,
  Maybe,
  TaskHeaderFragment,
  useAssignVolunteerMutation
} from 'generated/graphql'

import router from 'next/router'
import { useForm } from 'react-hook-form'
import { UserAddIcon } from '@heroicons/react/outline'

type Props = {
  userId: number
  tasks: Maybe<TaskHeaderFragment[]> | undefined
  defaultTaskId?: number
}

export default function AssignVolunteerButton({
  userId,
  tasks,
  defaultTaskId
}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: { assignTo: defaultTaskId ? defaultTaskId : '' }
  })
  const [assignVolunteer] = useAssignVolunteerMutation()

  return (
    <form
      onSubmit={handleSubmit(async (data: { assignTo: string }) => {
        const response = await assignVolunteer({
          variables: {
            userId: userId,
            taskId: parseInt(data.assignTo)
          },
          refetchQueries: [
            {
              query: EventTasksDocument,
              variables: { eventId: parseInt(router.query.eventId as string) }
            }
          ]
        })
        if (response.data?.addVolunteerToTask.errors) {
          response.data?.addVolunteerToTask.errors.forEach(({ message }) =>
            setError('assignTo', { type: 'manual', message: message })
          )
        }
      })}
      className="flex gap-2"
    >
      <select
        {...register('assignTo')}
        placeholder="Assign To"
        className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 border-none rounded-md dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-0"
      >
        {tasks?.map((task) => (
          <option key={task.id} value={task.id}>
            {task.description}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
        ) : (
          <UserAddIcon />
        )}
        Assign
      </button>
    </form>
  )
}
