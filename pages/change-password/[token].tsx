import { Form, Formik } from 'formik'
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation
} from 'generated/graphql'
import React, { useState } from 'react'

import InputField from 'components/InputField'
import Link from 'next/link'
import { NextPage } from 'next'
import { toErrorMap } from 'utils/toErrorMap'
import { useRouter } from 'next/router'
import { withApollo } from 'utils/withApollo'
import Body from 'components/Body'

const ChangePassword(): NextPage {
  const router = useRouter()
  const [changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  
  return (
    <Body>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === 'string' ? router.query.token : ''
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.changePassword.user
                }
              })
            }
          })
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              type="password"
            />
            {tokenError && (
              <>
                <p className="text-red-500">
                  {tokenError}
                </p>
                <Link href="/forgot-password">
                  <a>Click here to get a new one</a>
                </Link>
              </>
            )}
            <button
              type="submit"
            >
              Change password
            </button>
          </Form>
        )}
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(ChangePassword)
