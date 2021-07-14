import { HeaderFragment, MeQuery } from 'generated/graphql'

import Avatar from 'components/layout/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = ({ me }: { me?: HeaderFragment }) => {
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Givehub" height={36} width={155} />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {me ? (
            <Avatar me={me} />
          ) : (
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

export default Header
