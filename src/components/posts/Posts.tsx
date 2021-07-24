import {
  EventInfoFragmentDoc,
  PostCardFragmentDoc,
  usePostsQuery
} from 'generated/graphql'

import Post from 'components/posts/Post'
import { filter } from 'graphql-anywhere'

export default function Posts() {
  const { data } = usePostsQuery({
    variables: { cursor: null, limit: 50 }
  })

  return (
    <>
      {data &&
        data.posts?.items.map((post) => (
          <Post
            key={post.post.id}
            post={filter(PostCardFragmentDoc, post.post)}
            event={
              post.event ? filter(EventInfoFragmentDoc, post.event) : undefined
            }
            lineclamp
          />
        ))}
    </>
  )
}
