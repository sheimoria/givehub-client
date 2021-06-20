import Body from 'components/Body'
import { EditDeletePostButtons } from 'components/EditDeletePostButtons'
import Like from 'components/Like'
import Link from 'next/link'
import { usePostsQuery } from 'generated/graphql'
import { withApollo } from 'utils/withApollo'

function Index() {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 3,
      cursor: null
    },
    notifyOnNetworkStatusChange: true
  })

  return (
    <Body>
      {error && <p>{error.message}</p>}
      {loading && <h6>Loading...</h6>}
      {data && (
        <section>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <article key={post.id}>
                <div>
                  <p>{post.creator.username}</p>
                  <EditDeletePostButtons
                    id={post.id}
                    creatorId={post.creator.id}
                  />
                </div>
                <Link href={`/post/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
                <p>{post.textSnippet}</p>
                <Like post={post} />
              </article>
            )
          )}
          cc
        </section>
      )}
      {data && data.posts.hasMore && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
              }
            })
          }}
        >
          Load more posts
        </button>
      )}
    </Body>
  )
}

export default withApollo({ ssr: true })(Index)
