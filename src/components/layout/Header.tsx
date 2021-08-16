import Avatar from 'components/layout/Avatar'
import { HeaderFragment } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import Search from 'components/layout/SearchBar'
import { useRouter } from 'next/router'

const Header = ({ me }: { me?: HeaderFragment }) => {
  const router = useRouter()

  return (
    <header>
      <nav>
        <Link href="/home" passHref>
          <div className="relative w-9 h-9 sm:w-44">
            <Image
              src="/logo.svg"
              alt="Givehub"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              priority
              className="cursor-pointer"
            />
          </div>
        </Link>
        {me && (
          <>
            <Search />
            <div className="flex justify-end flex-none lg:w-96">
              <Avatar me={me} />
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
