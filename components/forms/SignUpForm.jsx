import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import Field from 'components/forms/Field'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { gql } from '@apollo/client'
import { signUpSchema } from 'utils/formSchemas'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useSignUpMutation from 'hooks/useSignUpMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export default function SignUpForm() {
  const [signUp] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signUpSchema.validation) })
  const router = useRouter()
  const [open, setOpen] = useState(false)
  async function onSubmit(values) {
    const response = await signUp({
      variables: { options: values },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: gql`
            query Me {
              me {
                id
                username
                adminCharities {
                  id
                  name
                }
              }
            }
          `,
          data: {
            __typename: 'Query',
            me: data.register.user
          }
        })
      }
    })
    if (response.data.register.errors) {
      response.data.register.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else if (response.data.register.user) {
      router.push('/')
    }
  }

  return (
    <>
      <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="-mb-1">{signUpSchema.label}</h4>
        <a onClick={() => setOpen(true)}>
          <InformationCircleIcon className="w-4 h-4" />I am signing up as a
          charity
        </a>
        {signUpSchema.fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            register={register}
            errors={errors[field.name]}
          />
        ))}
        <div />
        <button type="submit">Sign Up</button>
      </form>

      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-flex flex-col items-stretch gap-4 p-6 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl w-96">
                <Dialog.Title as="h4">Sign up as user first</Dialog.Title>
                <p className="mb-2 text-left">
                  To sign up as a charity, you need to first sign up as a user.
                  Then after logging in, click on "My Charity" at the top right
                  of the homepage.
                </p>
                <button className="bg-rose-600" onClick={() => setOpen(false)}>
                  Got it, back to sign up
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
