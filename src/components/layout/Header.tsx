import { HeaderFragment } from 'generated/graphql'

import Avatar from 'components/layout/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from 'components/layout/Search'

const Header = ({ me }: { me?: HeaderFragment }) => {
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/" passHref>
          <div className="flex items-center pr-10">
            <Image src="/logo.svg" alt="Givehub" height={36} width={155} />
          </div>
        </Link>
        <div className="flex flex-row-reverse items-center justify-between flex-auto">
          {me ? (
            <>
              <Avatar me={me} />
              <Search />
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/">
                <a>Log in</a>
              </Link>
              <button onClick={() => router.push('/sign-up')}>Sign up</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
