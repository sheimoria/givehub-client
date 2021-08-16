import {
  Maybe,
  TaskHeaderFragment,
  UserHeaderFragment
} from 'generated/graphql'

import AssignVolunteerButton from './AssignVolunteerButton'
import Picture from 'components/Picture'
import router from 'next/router'

type Props = {
  user: UserHeaderFragment
  tasks: Maybe<TaskHeaderFragment[]> | undefined
}

export default function UnassignedVolunteer({ user, tasks }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={() =>
          router.push({
            pathname: '/user',
            query: { userId: user.id }
          })
        }
        className="flex items-center gap-4"
      >
        <Picture pictureId={user.profile?.displayPicture} />
        <div className="flex flex-col">
          <h6 className="truncate transition-colors hover:text-gray-800 dark:hover-text-gray-100">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <span className="text-xs truncate text-rose-600">
            @{user.username}
          </span>
        </div>
      </div>
      <AssignVolunteerButton userId={user.id} tasks={tasks} />
    </div>
  )
}
