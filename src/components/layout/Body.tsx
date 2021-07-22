import { HeaderFragment, MeQuery } from 'generated/graphql'
import { ReactNode } from 'react'
import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import Navigation from './Navigation'

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
              <div className="sticky flex flex-col gap-3 top-5">{aside}</div>
            </aside>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
