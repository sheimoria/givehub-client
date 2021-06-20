import Footer from 'components/Footer'
import Head from 'next/head'
import Header from 'components/Header'

export default function Body({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
