import Body from 'components/layout/Body'
import LogIn from 'components/LogIn'
import { useMeQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function Index() {
  const { data } = useMeQuery()
  const router = useRouter()

  return (
    <>
      {data?.me ? (
        router.replace('/home')
      ) : (
        <Body title="Home">
          <div className="flex flex-wrap items-center justify-between flex-auto gap-6">
            <h1>
              Discover volunteer opportunities
              <br />
              <span className="text-gray-700 dark:text-gray-200">
                Manage volunteers
              </span>
            </h1>
            <LogIn />
          </div>
        </Body>
      )}
    </>
  )
}
