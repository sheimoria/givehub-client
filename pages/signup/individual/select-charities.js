import Body from 'components/Body'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function IndividualSelectCharities() {
  const router = useRouter()

  return (
    <Body>
      <h3>Here's some charities you might be interested in following</h3>
      <Link href="/signup/individual/success">
        <a>
          Continue <ChevronRightIcon className="w-5 h-5" />
        </a>
      </Link>
    </Body>
  )
}
