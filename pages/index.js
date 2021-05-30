import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'

/* import { useQuery } from '@apollo/client'
import GET_USER_BY_LOGIN from '../lib/queries/getUserByLogin'
import { initializeApollo } from '../lib/apollo' */

export default function Index() {
  const { user, error, isLoading } = useUser()

  if (isLoading)
    return (
      <>
        <Head>
          <title>Givehub: Loading...</title>
        </Head>
        <main className="flex flex-col items-center justify-center max-w-lg min-h-screen gap-4 p-6 mx-auto">
          <p className="text-rose-600">Loading...</p>
        </main>
      </>
    )
  if (error)
    return (
      <>
        <Head>
          <title>Givehub: Error</title>
        </Head>
        <main className="flex flex-col items-center justify-center max-w-lg min-h-screen gap-4 p-6 mx-auto">
          <p className="text-rose-600">{error.message}</p>
        </main>
      </>
    )

  if (user) {
    /* const { data, error, loading } = useQuery(GET_USER_BY_LOGIN, {
      variables: { code: VARIABLE } // user_id ...
    }) */

    return (
      <>
        <Head>
          <title>Givehub: Dashboard</title>
        </Head>
        <main className="flex flex-col items-start justify-center max-w-lg min-h-screen gap-4 p-6 mx-auto">
          <Image src="/logoText.svg" width={213} height={45} alt="Givehub" />
          <img
            className="w-20 h-20 border rounded-full border-rose-600"
            src={user.picture}
            alt={user.name}
          />
          <p className="text-rose-600">
            Welcome {user.name}! Here's the data we received from you signing
            up:
          </p>
          <code className="px-4 py-2 border rounded-md text-rose-600 border-rose-600">
            {JSON.stringify(user, null, 2)}
          </code>
          <a
            href="/api/auth/logout"
            className="inline-flex items-center flex-none px-4 py-2 text-white border rounded-md bg-rose-600 border-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Log out
          </a>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Givehub: Login</title>
      </Head>
      <main className="flex flex-col items-start justify-center max-w-lg min-h-screen gap-4 p-6 mx-auto">
        <Image src="/logoText.svg" width={213} height={45} />
        <p className="text-rose-600">
          Welcome! Givehub is a one-stop platform for the community to discover
          volunteering opportunities and charities to manage their volunteers.
        </p>
        <div className="flex gap-2">
          <a
            href="/api/auth/login"
            className="inline-flex items-center flex-none px-4 py-2 border rounded-md border-rose-600 text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Log in
          </a>
          <a
            href="/api/auth/login"
            className="inline-flex items-center flex-none px-4 py-2 text-white border rounded-md bg-rose-600 border-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Sign up
          </a>
        </div>
      </main>
    </>
  )
}
