import { HeaderFragment, MeQuery } from 'generated/graphql'
import React, { ReactNode } from 'react'

import CharitiesToFollow from 'components/users/CharitiesToFollow'
import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import Navigation from './Navigation'
import PeopleToFollow from 'components/users/PeopleToFollow'
import YourEvents from 'components/layout/YourEvents'
import FriendRequests from 'components/users/FriendRequests'
import UserTasks from 'components/users/UserTasks'

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
      <div className="flex justify-center flex-auto gap-5 md:px-5">
        {me && (
          <aside className="flex-none md:block">
            <Navigation />
          </aside>
        )}
        <main>{children}</main>
        {me && (
          <>
            <aside className="flex-none w-96 lg:block">
              <div className="sticky flex flex-col gap-3 top-5">
                <FriendRequests />
                <UserTasks />
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
