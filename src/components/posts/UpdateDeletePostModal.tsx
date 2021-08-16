import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import {
  PostInfoFragment,
  PostsDocument,
  useDeletePostMutation,
  useUpdatePostMutation
} from 'generated/graphql'

import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import React, { Fragment } from 'react'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import { RefreshIcon } from '@heroicons/react/outline'

type Props = {
  toggleIsOpen: () => void
  post: PostInfoFragment
}

export default function CreatePostModal({ toggleIsOpen, post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { text: post.text },
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
      toggleIsOpen()
    }
  }

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        open
        onClose={toggleIsOpen}
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
            <div className="z-10 w-full">
              <Form
                handleSubmit={handleSubmit}
                onSubmit={handleUpdatePost}
                className="mx-auto modal"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Update Post</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
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
                  className="w-full h-24 p-0 text-gray-700 placeholder-gray-500 border-none resize-none dark:placeholder-gray-400 dark:text-gray-200 focus:outline-none focus:ring-0"
                  srOnly
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      toggleIsOpen()
                      deletePost()
                    }}
                    className="btn-secondary"
                  >
                    <TrashIcon />
                    Delete Post
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <RefreshIcon />
                    )}
                    Update Post
                  </button>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
