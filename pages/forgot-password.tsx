import { Form, Formik } from 'formik'
import { useState, ReactElement } from 'react'
import InputField from 'components/InputField'
import { useForgotPasswordMutation } from 'generated/graphql'
import { withApollo } from 'utils/withApollo'
import Body from 'components/Body'

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
              <InputField name="email" label="Email" type="email" />
              <button type="submit">Send password reset email</button>
            </Form>
          )
        }
      </Formik>
    </Body>
  )
}

export default withApollo({ ssr: false })(ForgotPassword)
