import { HeaderFragment } from 'generated/graphql'

import Avatar from 'components/layout/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from 'components/layout/Search'
import Transit from 'components/Transit'

const Header = ({ me }: { me?: HeaderFragment }) => {
  const router = useRouter()

  return (
    <header>
      <nav>
        <Transit>
          <Link href="/" passHref>
            <div className="flex items-center pr-8">
              <Image src="/logo.svg" alt="Givehub" height={36} width={155} />
            </div>
          </Link>
        </Transit>
        <Transit className="flex items-center flex-auto gap-5">
          {me ? (
            <>
              <Search />
              <Avatar me={me} />
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/">
                <a>Log in</a>
              </Link>
              <button onClick={() => router.push('/sign-up')}>Sign up</button>
            </div>
          )}
        </Transit>
      </nav>
    </header>
  )
}

export default Header
