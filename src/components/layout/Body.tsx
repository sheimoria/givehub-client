import { HeaderFragment, MeQuery } from 'generated/graphql'
import React, { ReactNode } from 'react'

import CharitiesToFollow from 'components/layout/CharitiesToFollow'
import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import Navigation from './Navigation'
import PeopleToFollow from 'components/layout/PeopleToFollow'
import YourEvents from 'components/layout/YourEvents'
import FriendRequests from 'components/users/FriendRequests'

type BodyProps = {
  title: string
  me?: HeaderFragment
  children: ReactNode
}

export default function Body({ title, me, children }: BodyProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header me={me} />
      <div className="flex justify-center flex-auto gap-6 md:px-6">
        {me && (
          <aside className="flex-none md:block">
            <Navigation />
          </aside>
        )}
        <main>{children}</main>
        {me && (
          <>
            <aside className="flex-none w-80 lg:block">
              <div className="sticky flex flex-col gap-3 top-5">
                <FriendRequests />
                <YourEvents />
                <CharitiesToFollow />
                <PeopleToFollow />
              </div>
            </aside>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
