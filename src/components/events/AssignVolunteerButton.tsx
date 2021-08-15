import {
  EventTasksDocument,
  Maybe,
  TaskHeaderFragment,
  useAssignVolunteerMutation
} from 'generated/graphql'

import FormButton from 'components/forms/FormButton'
import router from 'next/router'
import { useForm } from 'react-hook-form'

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
      className="flex-row items-center flex-auto p-0 bg-transparent border-none shadow-none"
    >
      <select {...register('assignTo')} placeholder="Assign To">
        {tasks?.map((task) => (
          <option key={task.id} value={task.id}>
            {task.description}
          </option>
        ))}
      </select>
      <FormButton label="Assign" isSubmitting={isSubmitting} />
    </form>
  )
}
