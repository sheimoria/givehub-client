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
    <Transit as="article" className="gap-0 px-0 pb-2">
      <h5 className="px-5">Tasks</h5>
      <dl className="p-0 border-none shadow-none dark:border-none dark:shadow-none divide">
        {data?.event?.eventTasks && data.event.eventTasks.length > 0 ? (
          data.event.eventTasks.map((task) => (
            <div key={task.id} className="flex flex-col px-5 py-3">
              <div className="flex items-center justify-between gap-3">
                <h6>{task.description}</h6>
                <DeleteTaskButton taskId={task.id} />
              </div>
              {task.volunteersAssigned && task.volunteersAssigned.length > 0 ? (
                <>
                  <p>
                    <UserGroupIcon />
                    {task.volunteersAssigned.length}{' '}
                    {task.volunteersAssigned.length > 1
                      ? 'volunteers'
                      : 'volunteer'}
                  </p>
                  <div className="divide">
                    {task.volunteersAssigned.map((volunteer) => (
                      <div
                        key={volunteer.id}
                        className="flex flex-wrap items-center justify-between gap-3"
                      >
                        <div
                          className="flex items-center gap-3 py-3"
                          onClick={() =>
                            router.push({
                              pathname: '/user',
                              query: { userId: volunteer.id }
                            })
                          }
                        >
                          <Picture
                            pictureId={volunteer.profile?.displayPicture}
                            size={10}
                          />
                          <div className="flex flex-col">
                            <h6>
                              {volunteer.profile?.firstName}{' '}
                              {volunteer.profile?.lastName}
                            </h6>
                            <p>@{volunteer.username}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="pt-2">No volunteers assigned to this task yet.</p>
              )}
            </div>
          ))
        ) : (
          <div className="px-5 py-2">
            <p>You have not created any tasks.</p>
          </div>
        )}
      </dl>
    </Transit>
  )
}
