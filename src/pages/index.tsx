import LogInForm from 'components/forms/LogInForm'
import { useMeQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import React from 'react'
import Body from 'components/layout/Body'

export default function Index() {
  const { data } = useMeQuery()
  const router = useRouter()

  return data?.me ? (
    router.replace('/home')
  ) : (
    <Body title="Home">
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
    </Body>
  )
}
