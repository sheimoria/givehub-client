import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'

import Link from 'next/link'
import { isServer } from 'utils/isServer'
import { useRouter } from 'next/router'

const ME = gql`
  {
    me {
      username
    }
  }
`

const LOGOUT = gql`
  mutation {
    logout
  }
`

export default function Header() {
  const apolloClient = useApolloClient()
  const { data, loading, error } = useQuery(ME, {
    variables: { skip: isServer() }
  })
  const [logout] = useMutation(LOGOUT)
  const router = useRouter()

  if (loading) return <header className="bg-gray-100 animate-pulse"></header>
  if (error) return <header className="items-center">{error.message}</header>

  return (
    <header>
      <nav>
        <Link href="/">
          <h2 className="text-2xl md:text-3xl">givehub</h2>
        </Link>
        {data.me ? (
          <div className="flex items-center gap-6">
            <p>{data.me.username}</p>
            <Link href="/create-post">
              <button>My Charity</button>
            </Link>
            <button
              onClick={async () => {
                await logout()
                await apolloClient.resetStore()
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/login">
              <a>Log in</a>
            </Link>
            <button onClick={() => router.push('/signup')}>Sign up</button>
          </div>
        )}
      </nav>
    </header>
  )
}
