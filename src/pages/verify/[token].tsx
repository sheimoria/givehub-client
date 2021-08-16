import { ArrowRightIcon, BadgeCheckIcon } from '@heroicons/react/outline'

import Body from 'components/layout/Body'
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
            <span className="text-gray-700 dark:text-gray-200">
              Press the button below to complete the verification process.
            </span>
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
              className="btn-primary"
            >
              <BadgeCheckIcon />
              Verify My Account
            </button>
          </>
        ) : status === 'VERIFIED' ? (
          <>
            <h2>You&apos;re successfully verified!</h2>
            <button
              onClick={() =>
                router.replace({
                  pathname: '/user-profile'
                })
              }
              className="btn-primary"
            >
              Proceed to fill in your User Profile
              <ArrowRightIcon />
            </button>
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
