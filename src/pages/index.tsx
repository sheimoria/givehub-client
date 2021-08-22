import Body from 'components/layout/Body'
import LogIn from 'components/LogIn'
import Transit from 'components/Transit'
import { useMeQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Index() {
  const { data } = useMeQuery()
  const router = useRouter()

  return (
    <Body title="Givehub">
      {data?.me ? (
        typeof router.query.next === 'string' ? (
          router.push(router.query.next)
        ) : (
          router.push('/home')
        )
      ) : (
        <div className="flex flex-col items-center justify-center flex-auto gap-6 px-6 sm:px-0 sm:flex-row sm:justify-between">
          <Transit
            as="div"
            className="relative w-full h-64 max-w-2xl sm:h-full"
          >
            <Image
              src="/hero.svg"
              alt="Hero"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              priority
            />
          </Transit>
          <LogIn />
        </div>
      )}
    </Body>
  )
}
