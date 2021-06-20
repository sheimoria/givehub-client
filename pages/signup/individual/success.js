import Body from 'components/Body'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function IndividualSignUpSuccess() {
  return (
    <Body title="Sign up success">
      <h3>Congratulations! You have successfully signed up!</h3>
      <Link href="/">
        <a>
          Head to dashboard <ChevronRightIcon className="w-5 h-5" />
        </a>
      </Link>
    </Body>
  )
}
