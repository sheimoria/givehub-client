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
    <div className="flex flex-col gap-3 py-3">
      <div className="flex items-center gap-3">
        <Picture pictureId={user.profile?.displayPicture} />
        <div
          className="flex flex-col"
          onClick={() =>
            router.push({
              pathname: '/user',
              query: { userId: user.id }
            })
          }
        >
          <h6 className="truncate">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <p className="truncate">@{user.username}</p>
        </div>
      </div>
      <AssignVolunteerButton userId={user.id} tasks={tasks} />
    </div>
  )
}
