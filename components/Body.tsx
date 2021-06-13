import Footer from 'components/Footer'
import Header from 'components/Header'
import { ReactElement } from 'react'

interface bodyProps {}

export default function Body({ children }): ReactElement<bodyProps> {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
