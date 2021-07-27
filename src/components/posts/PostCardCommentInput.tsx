import {
  PostCardCommentInputFragment,
  PostCommentsDocument,
  useCreateCommentMutation,
  useMeQuery
} from 'generated/graphql'

import Form from 'components/Forms/Form'
import FormButton from 'components/Forms/FormButton'
import Input from 'components/Forms/Input'
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
        <Transit onEveryMount as="div" className="flex gap-3">
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
            className="flex-row flex-auto p-0 border-none shadow-none bg-none dark:bg-none dark:border-none"
          >
            <Input
              name="comment"
              label="comment"
              srOnly
              placeholder="Add Comment..."
              register={register}
              errors={errors.comment}
              className="px-4 rounded-full"
            />
            <FormButton label="Add" isSubmitting={isSubmitting} />
          </Form>
        </Transit>
      )}
    </>
  )
}
