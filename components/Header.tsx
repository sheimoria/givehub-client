import { useLogoutMutation, useMeQuery } from 'generated/graphql'

import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { isServer } from 'utils/isServer'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

interface HeaderProps {}

export default function Header(): ReactElement<HeaderProps> {
  const apolloClient = useApolloClient()
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  const { data, loading } = useMeQuery({
    skip: isServer()
  })
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/">
          <Image
            src="/logoText.svg"
            alt="Givehub logo"
            height={36}
            width={171}
          />
        </Link>
        {loading && <h6>Loading...</h6>}
        {!data?.me ? (
          <div className="flex gap-4">
            <Link href="/login">
              <a>Login</a>
            </Link>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>{data.me.username}</p>
            <Link href="/create-post">
              <button>New Post</button>
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
        )}
      </nav>
    </header>
  )
}
