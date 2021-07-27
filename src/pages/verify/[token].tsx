import { ArrowRightIcon } from '@heroicons/react/outline'
import Body from 'components/Layout/Body'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useVerifyUserMutation } from 'generated/graphql'

export default function VerifyUser() {
  const [verifyUser] = useVerifyUserMutation()
  const router = useRouter()
  const [status, setStatus] = useState('PENDING')

  return (
    <Body title="Verify Your Account">
      <div className="flex flex-col items-start justify-center flex-auto gap-3 p-5">
        {status === 'PENDING' ? (
          <>
            <p>Press the button below to complete the verification process.</p>
            <button
              onClick={async () => {
                const response = await verifyUser({
                  variables: { token: router.query.token as string }
                })
                if (response.data?.verifyUser.success) {
                  setStatus('VERIFIED')
                } else {
                  setStatus('REJECTED')
                }
              }}
            >
              Verify My Account
            </button>
          </>
        ) : status === 'VERIFIED' ? (
          <>
            <h2>You&apos;re successfully verified!</h2>
            <Link
              href={{
                pathname: '/user-profile'
              }}
              replace
            >
              <a className="text-rose-600 hover:text-rose-700">
                Proceed to fill in your user profile
                <ArrowRightIcon className="text-rose-600 hover:text-rose-700" />
              </a>
            </Link>
          </>
        ) : (
          <>
            <h2>Oops, something went wrong.</h2>
            <p>We were unable to verify you.</p>
          </>
        )}
      </div>
    </Body>
  )
}
