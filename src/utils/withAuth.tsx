import { ComponentType, useEffect } from 'react'
import { HeaderFragment, useMeQuery } from 'generated/graphql'

import { useRouter } from 'next/router'

export interface WithAuthProps {
  me: HeaderFragment
}

export default function withAuth<P extends WithAuthProps>(
  Page: ComponentType<P>
): React.FC<Omit<P, 'me'>> {
  return function useAuth(props): JSX.Element {
    const { data, loading, error } = useMeQuery()
    const router = useRouter()

    useEffect(() => {
      if ((data?.me && !error) || loading) return
      router.replace({ pathname: '/', query: { next: router.pathname } })
    }, [data, loading, error, router])

    if (error) return <p>{error.message}</p>
    if (loading) return <div className="animate-spin" />
    if (data?.me) return <Page me={data.me} {...(props as any)} />

    return <></>
  }
}
