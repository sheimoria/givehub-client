import { gql, useQuery } from '@apollo/client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useIsAuth() {
  const { data, loading } = useQuery(ME)
  const router = useRouter()
  useEffect(() => {
    if (!loading && !data.me) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router])
}

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`
