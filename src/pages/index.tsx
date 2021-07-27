import Body from 'components/Layout/Body'
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
        <div className="flex flex-col flex-wrap items-center justify-center flex-auto gap-5 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3 px-5 md:px-0">
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
