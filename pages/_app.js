import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0'
/* import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo' */

export default function App({ Component, pageProps }) {
  /* const apolloClient = useApollo(pageProps.initialApolloState) */
  return (
    <>
      <Head>
        <meta description="Social platform for volunteers to discover opportunities and charities to manage their volunteers"></meta>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <UserProvider>
        {/* <ApolloProvider client={apolloClient}> */}
        <Component {...pageProps} />
        {/*</ApolloProvider>*/}
      </UserProvider>
    </>
  )
}
