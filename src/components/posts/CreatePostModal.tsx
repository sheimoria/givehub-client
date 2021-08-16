import * as yup from 'yup'

import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {
  PostInput,
  PostsDocument,
  useCreatePostMutation
} from 'generated/graphql'

import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import Textarea from 'components/forms/Textarea'
import UploadImageButton from 'components/UploadImageButton'
import { XIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UploadIcon } from '@heroicons/react/outline'
import router from 'next/router'

export default function CreatePostModal({
  toggleIsOpen
}: {
  toggleIsOpen: () => void
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
        toggleIsOpen()
        router.push('/home')
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
        toggleIsOpen()
        router.push('/home')
      }
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
                onSubmit={handleCreatePost}
                className="mx-auto modal"
              >
                <div className="flex justify-between">
                  <Dialog.Title as="h5">Create Post</Dialog.Title>
                  <XIcon onClick={toggleIsOpen} className="clickable" />
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
                  className="w-full h-24 p-0 text-gray-700 placeholder-gray-500 border-none resize-none dark:placeholder-gray-400 dark:text-gray-200 focus:outline-none focus:ring-0"
                  srOnly
                />
                <div className="flex justify-end gap-2">
                  <UploadImageButton setImage={setImage} label="Upload Image" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-rose-600 hover:bg-rose-700"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
                    ) : (
                      <UploadIcon />
                    )}
                    Create Post
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
