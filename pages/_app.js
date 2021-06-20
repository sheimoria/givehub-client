import 'styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import client from 'apollo-client'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="stylesheet" href="https://tinyurl.com/gilroycss" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/ifo7xry.css" />
      </Head>
      <ThemeProvider attribute="class">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}
