import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {
  PostInput,
  PostsDocument,
  useCreatePostMutation
} from 'generated/graphql'

import Form from 'components/Forms/Form'
import FormButton from 'components/Forms/FormButton'
import Textarea from 'components/Forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { XIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreatePostModal({
  setIsOpen
}: {
  setIsOpen: (arg0: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        text: yup.string().required('Required')
      })
    )
  })
  const [image, setImage] = useState('')
  const [createPost] = useCreatePostMutation()

  async function handleCreatePost(data: PostInput) {
    if (image === '') {
      const response = await createPost({
        variables: {
          input: data
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
    } else {
      const imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', 'postImages')
      const imageResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/givehub/image/upload',
        imageData
      )
      const formResponse = await createPost({
        variables: {
          input: { imageUrl: imageResponse.data.public_id, ...data }
        },
        refetchQueries: [
          {
            query: PostsDocument,
            variables: { cursor: null, limit: 50 }
          }
        ]
      })
      if (!formResponse.data?.createPost?.post) {
        return console.error('There was an error creating your post.')
      } else {
        setIsOpen(false)
      }
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
                  label="Text"
                  placeholder="What's on your mind?"
                  register={register}
                  errors={errors.text}
                  className="p-0 bg-white border-none shadow-none focus:ring-0 dark:bg-gray-800"
                  srOnly
                />
                <div className="flex justify-between">
                  <UploadImageButton setImage={setImage} />
                  <FormButton label="Create" isSubmitting={isSubmitting} />
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
