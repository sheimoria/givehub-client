import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import Body from 'components/Body'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta description="Social platform for Singaporeans to discover volunteer opportunities and charities to manage volunteers"></meta>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <UserProvider>
        <Body>
          <Component {...pageProps} />
        </Body>
      </UserProvider>
    </>
  )
}
