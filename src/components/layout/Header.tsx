import Avatar from 'components/layout/Avatar'
import { HeaderFragment } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import Search from 'components/layout/SearchBar'
import Transit from 'components/Transit'
import { useRouter } from 'next/router'

const Header = ({ me }: { me?: HeaderFragment }) => {
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/" passHref>
          <div className="hidden md:flex md:flex-none w-44">
            <Image src="/logo.svg" alt="Givehub" height={36} width={155} />
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="flex flex-none md:hidden">
            <Image src="/logo-lite.svg" alt="Givehub" height={36} width={36} />
          </div>
        </Link>

        {me ? (
          <>
            <Search />
            <div className="flex items-center justify-end flex-none gap-5 lg:w-96">
              <Avatar me={me} />
            </div>
          </>
        ) : (
          <div className="flex items-center flex-none gap-5">
            <Link href="/">
              <a>Log in</a>
            </Link>
            <button onClick={() => router.push('/sign-up')}>Sign up</button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
