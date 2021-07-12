import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import MiscEvents from 'components/events/MiscEvents'
import Navigation from 'components/layout/Navigation'
import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export default function Body(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <div className="flex justify-center flex-auto gap-6">
        <Navigation />
        <main>{props.children}</main>
        <MiscEvents />
      </div>
      <Footer />
    </>
  )
}
