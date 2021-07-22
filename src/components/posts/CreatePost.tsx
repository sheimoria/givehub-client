import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import {
  PostInput,
  PostsDocument,
  useCreatePostMutation
} from 'generated/graphql'
import { Fragment } from 'react'

import Form from 'components/forms/Form'
import { PhotographIcon } from '@heroicons/react/outline'
import Textarea from 'components/forms/Textarea'
import { XIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

type CreatePostProps = {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
}

export default function CreatePost({ isOpen, setIsOpen }: CreatePostProps) {
  const [createPost] = useCreatePostMutation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        text: yup.string().required('Required')
      })
    )
  })
  const router = useRouter()

  async function handleCreatePost(values: PostInput) {
    const response = await createPost({
      variables: {
        input: values
      },
      refetchQueries: [
        {
          query: PostsDocument,
          variables: { cursor: null, limit: 50 }
        }
      ]
    })
    if (!response.data?.createPost?.post) {
      return console.error('There was an error creating your post.')
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
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
                onSubmit={handleCreatePost}
                className="w-96"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Create Post</Dialog.Title>
                  <span onClick={() => setIsOpen(false)}>
                    <XIcon />
                  </span>
                </div>
                <Dialog.Description className="hidden">
                  What is on your mind?
                </Dialog.Description>
                <Textarea
                  name="text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="p-0 bg-white border-none shadow-none focus:ring-0 dark:bg-gray-800"
                />
                <div className="flex justify-between">
                  <a>
                    <PhotographIcon />
                    Add Photo
                  </a>
                  <button type="submit">Post</button>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
