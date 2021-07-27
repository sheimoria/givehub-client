import Picture from 'components/Picture'
import { UserHeaderFragment } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function VolunteerRequest({
  user
}: {
  user: UserHeaderFragment
}) {
  const router = useRouter()

  return (
    <div
      className="flex flex-wrap justify-between gap-3 py-3 clickable-float"
      onClick={() =>
        router.push({
          pathname: '/user',
          query: { userId: user.id }
        })
      }
    >
      <div className="flex items-center gap-3">
        <Picture pictureId={user.profile?.displayPicture} size={10} />
        <div className="flex flex-col">
          <h6 className="truncate">
            {user.profile?.firstName} {user.profile?.lastName}
          </h6>
          <p className="truncate">@{user.username}</p>
        </div>
      </div>
    </div>
  )
}
