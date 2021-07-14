import Footer from 'components/layout/Footer'
import Head from 'next/head'
import Header from 'components/layout/Header'
import LogInForm from 'components/forms/LogInForm'
import { useMeQuery } from 'generated/graphql'
import { useRouter } from 'next/router'

export default function Index() {
  const { data } = useMeQuery()
  const router = useRouter()

  if (data?.me) {
    router.replace('/home')
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div className="flex justify-center flex-auto gap-6">
        <main>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h1>
              Discover volunteer opportunities
              <br />
              <span className="text-gray-700 dark:text-gray-200">
                Manage volunteers
              </span>
            </h1>
            <LogInForm />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
