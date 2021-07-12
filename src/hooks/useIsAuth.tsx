import { ME } from 'hooks/useMeQuery'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
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
