import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import { MeQuery } from 'generated/graphql'
import { ReactNode } from 'react'

type BodyProps = {
  title: string
  data: MeQuery
  children: ReactNode
}

export default function Body({ title, data, children }: BodyProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header data={data} />
      <div className="flex justify-center flex-auto gap-6">
        {data.me && <p>Navigation</p>}
        <main>{children}</main>
        {data.me && <p>Events</p>}
      </div>
      <Footer />
    </>
  )
}
