import Body from 'components/layout/Body'
import Image from 'next/image'
import LogIn from 'components/LogIn'
import Transit from 'components/Transit'
import router from 'next/router'
import { useMeQuery } from 'generated/graphql'
import { useTheme } from 'next-themes'

export default function Index() {
  const { data } = useMeQuery()
  const { theme, setTheme } = useTheme()

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
            {theme === 'light' ? (
              <Image
                src="/hero.svg"
                alt="Hero"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                priority
              />
            ) : (
              <Image
                src="/hero-dark.svg"
                alt="Hero"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                priority
              />
            )}
          </Transit>
          <LogIn />
        </div>
      )}
    </Body>
  )
}
