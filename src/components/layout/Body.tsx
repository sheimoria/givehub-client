import { HeaderFragment, MeQuery } from 'generated/graphql'

import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import Navigation from './Navigation'
import { ReactNode } from 'react'

type Props = {
  title: string
  me?: HeaderFragment
  aside?: ReactNode
  children: ReactNode
}

export default function Body({ title, me, aside, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header me={me} />
      <div className="flex justify-center min-h-screen gap-6 pt-24 pb-20 mx-auto sm:px-6 max-w-7xl">
        {me && (
          <aside className="flex-none md:block">
            <Navigation />
          </aside>
        )}
        <main>{children}</main>
        {me && (
          <>
            <aside className="flex-none w-96 lg:block">
              <div className="sticky flex flex-col gap-6 top-24">{aside}</div>
            </aside>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
