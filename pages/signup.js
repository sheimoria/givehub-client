import { UserGroupIcon, UserIcon } from '@heroicons/react/solid'

import Body from 'components/Body'
import { useRouter } from 'next/router'

export default function SignUp() {
  const router = useRouter()

  return (
    <Body title="Sign up as">
      <div className="flex justify-center">
        <article>
          <h3>Sign up as:</h3>
          <div className="flex gap-4">
            <button onClick={() => router.push('/signup/individual')}>
              <UserIcon className="w-5 h-5" />
              Individual
            </button>
            <button onClick={() => router.push('/signup/charity')}>
              <UserGroupIcon className="w-5 h-5" />
              Charity
            </button>
          </div>
        </article>
      </div>
    </Body>
  )
}
