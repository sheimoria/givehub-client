import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ReactElement, useState } from 'react'

import Body from 'components/Body'
import { useForgotPasswordMutation } from 'generated/graphql'
import { withApollo } from 'utils/withApollo'

function ForgotPassword({}): ReactElement<{}> {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()

  return (
    <Body>
      <h3>Forgot password</h3>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values })
          setComplete(true)
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <p>
              If an account with that email exists, we have sent you an email.
            </p>
          ) : (
            <Form>
              <label htmlFor="email">Email</label>
              <Field name="email" />
              <ErrorMessage name="email" component="p" />
              <button type="submit">Send password reset email</button>
            </Form>
          )
        }
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(ForgotPassword)
