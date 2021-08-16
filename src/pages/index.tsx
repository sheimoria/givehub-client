import Body from 'components/layout/Body'
import LogIn from 'components/LogIn'
import Transit from 'components/Transit'
import { useMeQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function Index() {
  const { data } = useMeQuery()
  const router = useRouter()

  return (
    <Body title="Log In">
      {data?.me ? (
        typeof router.query.next === 'string' ? (
          router.push(router.query.next)
        ) : (
          router.push('/home')
        )
      ) : (
        <div className="flex flex-col flex-wrap items-center justify-center flex-auto gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-4 px-6 sm:px-0">
            <Transit as="h1">
              Discover volunteer opportunities.
              <br />
              Find your community.
              <br />
              Manage volunteers.
            </Transit>
            <Transit as="p" className="text-base">
              Givehub is a one-stop platform for all things volunteerism.
            </Transit>
          </div>
          <LogIn />
        </div>
      )}
    </Body>
  )
}
