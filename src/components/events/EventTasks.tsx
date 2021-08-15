import DeleteTaskButton from './DeleteTaskButton'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { UserGroupIcon } from '@heroicons/react/outline'
import { useEventTasksQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function EventTasks() {
  const router = useRouter()
  const { data } = useEventTasksQuery({
    variables: { eventId: parseInt(router.query.eventId as string) }
  })

  return (
    <Transit as="article" className="px-6 pb-6">
      <h5>Tasks</h5>
      {data?.event?.eventTasks && data.event.eventTasks.length > 0 ? (
        data.event.eventTasks.map((task) => (
          <>
            <div
              key={task.id}
              className="flex items-center justify-between gap-4"
            >
              <h6>{task.description}</h6>
              <DeleteTaskButton taskId={task.id} />
            </div>
            {task.volunteersAssigned && task.volunteersAssigned.length > 0 ? (
              <>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="secondary" />
                  <p>
                    {task.volunteersAssigned.length}{' '}
                    {task.volunteersAssigned.length > 1
                      ? 'volunteers'
                      : 'volunteer'}
                  </p>
                </div>
                {task.volunteersAssigned.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className="flex flex-wrap items-center justify-between gap-4"
                  >
                    <div
                      onClick={() =>
                        router.push({
                          pathname: '/user',
                          query: { userId: volunteer.id }
                        })
                      }
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <Picture pictureId={volunteer.profile?.displayPicture} />
                      <div className="flex flex-col">
                        <h6 className="transition-colors hover:text-gray-800 dark:hover:text-gray-100">
                          {volunteer.profile?.firstName}{' '}
                          {volunteer.profile?.lastName}
                        </h6>
                        <span className="text-xs text-rose-600">
                          @{volunteer.username}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No volunteers assigned to this task yet.</p>
            )}
          </>
        ))
      ) : (
        <p>You have not created any tasks.</p>
      )}
    </Transit>
  )
}
