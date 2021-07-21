import { EPost, usePostsQuery } from 'generated/graphql'

import Post from 'components/posts/Post'

export default function Posts() {
  const { data } = usePostsQuery({
    variables: { cursor: null, limit: 50 }
  })

  return (
    <>
      {data &&
        data.posts.items.map((post: EPost) => (
          <Post key={post.post.id} post={post} lineclamp />
        ))}
    </>
  )
}
