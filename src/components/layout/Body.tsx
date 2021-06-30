import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import MiscEvents from 'components/events/MiscEvents'
import Navigation from 'components/layout/Navigation'

export default function Body({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="flex justify-center flex-auto gap-6">
        <Navigation />
        <main>{children}</main>
        <MiscEvents />
      </div>
      <Footer />
    </>
  )
}
