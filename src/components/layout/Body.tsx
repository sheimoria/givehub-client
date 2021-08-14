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
      <div className="flex justify-center gap-6 mx-auto mt-24 sm:px-6 max-w-7xl">
        {me && (
          <aside className="flex-none md:block">
            <Navigation />
          </aside>
        )}
        <main>{children}</main>
        {me && (
          <>
            <aside className="flex-none w-96 lg:block">
              <div className="sticky flex flex-col gap-3 top-5">{aside}</div>
            </aside>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
