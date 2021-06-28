import Post from 'components/Post'
import { usePostsQuery } from 'hooks/graphql'

export default function Posts() {
  const { data, loading, error } = usePostsQuery(5, null)

  if (error) {
    return <section>{error.message}</section>
  }
  if (loading) {
    return <section className="bg-opacity-75 animate-pulse"></section>
  }
  if (data) {
    return (
      <section>
        {data.posts.posts.map((post) => (
          <Post id={post.id} />
        ))}
      </section>
    )
  }
}
