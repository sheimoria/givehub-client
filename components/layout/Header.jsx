import Avatar from 'components/layout/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import useMeQuery from 'hooks/useMeQuery'
import { useRouter } from 'next/router'

export default function Header() {
  const { data } = useMeQuery()
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/">
          <div>
            <Image src="/logo.svg" alt="Givehub" height={36} width={42} />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {(data && data.me && <Avatar user={data.me} />) || (
            <>
              <Link href="/log-in">
                <a>Log in</a>
              </Link>
              <button onClick={() => router.push('/sign-up')}>Sign up</button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}