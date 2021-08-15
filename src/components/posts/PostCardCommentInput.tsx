import {
  PostCardCommentInputFragment,
  PostCommentsDocument,
  useCreateCommentMutation,
  useMeQuery
} from 'generated/graphql'

import Form from 'components/forms/Form'
import FormButton from 'components/forms/FormButton'
import Input from 'components/forms/Input'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function PostCardCommentInput({
  post
}: {
  post: PostCardCommentInputFragment
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm()

  const [createComment] = useCreateCommentMutation()
  const { data } = useMeQuery()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ comment: '' })
    }
  }, [isSubmitSuccessful, reset])

  return (
    <>
      {data && (
        <Transit onEveryMount as="div" className="flex gap-4">
          <Picture pictureId={data.me?.profile?.displayPicture} />
          <Form
            handleSubmit={handleSubmit}
            onSubmit={(data) =>
              createComment({
                variables: { input: { text: data.comment }, postId: post.id },
                refetchQueries: [
                  {
                    query: PostCommentsDocument,
                    variables: {
                      depth: null,
                      limit: 3,
                      postId: post.id
                    }
                  }
                ]
              })
            }
            className="flex items-center flex-1 gap-4"
          >
            <Input
              name="comment"
              label="comment"
              srOnly
              placeholder="Add Comment..."
              register={register}
              errors={errors.comment}
              className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 rounded-full dark:placeholder-gray-500 dark:text-gray-200 dark:bg-gray-700 focus:outline-none"
            />
            <FormButton label="Add" isSubmitting={isSubmitting} />
          </Form>
        </Transit>
      )}
    </>
  )
}
