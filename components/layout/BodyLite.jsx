import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'

export default function Body({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="items-center justify-center">{children}</main>
      <Footer />
    </>
  )
}
