import * as yup from 'yup'

/* import { Dialog, Transition } from '@headlessui/react'
import {
  EventVolunteerContainer,
  PostsDocument,
  useDeletePostMutation,
  useUpdatePostMutation
} from 'generated/graphql'

import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import { Fragment } from 'react'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type Props = {
  setIsOpen: (arg0: boolean) => void
  event: EventVolunteerContainer[]
}

export default function CreatePostModal({ setIsOpen, event }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { ...assignedVolunteers },
    resolver: yupResolver(
      yup.object({
        text: yup.string().required('Required')
      })
    )
  })
  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation({
    variables: { id: post.id },
    refetchQueries: [
      {
        query: PostsDocument,
        variables: { cursor: null, limit: 50 }
      }
    ]
  })

  async function handleUpdatePost(data: { text: string; id: number }) {
    const response = await updatePost({
      variables: {
        text: data.text,
        id: post.id
      }
    })
    if (!response.data?.updatePost?.post) {
      return console.error()
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-10">
              <Form
                handleSubmit={handleSubmit}
                onSubmit={handleUpdatePost}
                className="w-96"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Update Post</Dialog.Title>
                  <XIcon
                    onClick={() => setIsOpen(false)}
                    className="clickable-scale"
                  />
                </div>
                <Dialog.Description className="hidden">
                  What&apos;s on your mind?
                </Dialog.Description>
                <Textarea
                  name="text"
                  label="Text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="p-0 bg-white border-none shadow-none focus:ring-0 dark:bg-gray-800"
                  srOnly
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      deletePost()
                    }}
                    className="button-outline"
                  >
                    Delete
                  </button>
                  <FormButton label="Update" isSubmitting={isSubmitting} />
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
 */
