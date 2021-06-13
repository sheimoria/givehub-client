import {
  LikeMutation,
  PostSnippetFragment,
  useLikeMutation
} from '../generated/graphql'

import { ApolloCache } from '@apollo/client'
import gql from 'graphql-tag'
import { useState, ReactElement } from 'react'
import { HeartIcon } from '@heroicons/react/solid'

interface LikeProps {
  post: PostSnippetFragment
}

function updateAfterLike(
  value: number,
  postId: number,
  cache: ApolloCache<LikeMutation>
) {
  const data = cache.readFragment<{
    id: number
    points: number
    likeStatus: number | null
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        likeStatus
      }
    `
  })

  if (data) {
    if (data.likeStatus === value) {
      return
    }
    const newPoints =
      (data.points as number) + (!data.likeStatus ? 1 : 2) * value
    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment __ on Post {
          points
          likeStatus
        }
      `,
      data: { points: newPoints, likeStatus: value }
    })
  }
}

export default function Like({ post }): ReactElement<LikeProps> {
  const [loading, setLoading] =
    useState<'like-loading' | 'not-loading'>('not-loading')
  const [like] = useLikeMutation()
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={async () => {
          if (post.likeStatus === 1) {
            return
          }
          setLoading('like-loading')
          await like({
            variables: {
              postId: post.id
            },
            update: (cache) => updateAfterLike(1, post.id, cache)
          })
          setLoading('not-loading')
        }}
      >
        <HeartIcon className="w-5 h-5" />
      </button>
      {post.points}
    </div>
  )
}
