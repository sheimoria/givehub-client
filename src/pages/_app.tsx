import 'styles/globals.css'

import { getInitialPreloadedQuery, getRelayProps } from 'relay-nextjs/app'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { ThemeProvider } from 'next-themes'
import client from 'apollo-client'
import { getClientEnvironment } from 'lib/clientEnvironment'

const clientEnvironment = getClientEnvironment()
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!
})

export default function App({ Component, pageProps }: AppProps) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery)
  const env = relayProps.preloadedQuery?.environment ?? clientEnvironment!

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <ThemeProvider attribute="class">
        <RelayEnvironmentProvider environment={env}>
          <ApolloProvider client={client}>
            <Component {...pageProps} {...relayProps} />
          </ApolloProvider>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </>
  )
}
