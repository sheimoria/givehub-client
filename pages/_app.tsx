import '../styles/globals.css'

import { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="description" content="Volunteer management system" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
