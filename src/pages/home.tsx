import CharitiesToFollow from 'components/CharitiesToFollow'
import Events from 'components/Events'
import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import Navigation from 'components/layout/Navigation'
import PeopleToFollow from 'components/PeopleToFollow'
import React from 'react'
import YourEvents from 'components/YourEvents'
import withAuth from 'utils/withAuth'

export default withAuth(function Home({ me }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header me={me} />
      <div className="flex justify-center flex-auto gap-6">
        <aside className="flex-none md:block">
          <Navigation />
        </aside>
        <main>
          <Events />
        </main>
        <aside className="flex-none w-80 lg:block">
          <div className="sticky flex flex-col gap-6 top-6">
            <YourEvents />
            <CharitiesToFollow />
            <PeopleToFollow />
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
})
