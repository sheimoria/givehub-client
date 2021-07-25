import Body from 'components/layout/Body'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useVerifyUserMutation } from 'generated/graphql'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

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
            <Link href={'/?next=/user-profile'}>
              <a className="text-rose-600 hover:text-rose-700">
                Proceed to login <ArrowRightIcon />
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
