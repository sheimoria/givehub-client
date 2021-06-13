import Body from 'components/Body'
import { EditDeletePostButtons } from 'components/EditDeletePostButtons'
import { useGetPostFromUrl } from 'utils/useGetPostFromUrl'
import { withApollo } from 'utils/withApollo'

function Post({}) {
  const { data, error, loading } = useGetPostFromUrl()

  return (
    <Body>
      {error && <h6>{error.message}</h6>}
      {loading && <h6 className="animate-pulse">Loading</h6>}
      {!data?.post && <h6>Could not find post</h6>}
      {data && (
        <>
          <h3>{data.post.title}</h3>
          <p>{data.post.text}</p>
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </>
      )}
    </Body>
  )
}

export default withApollo({ ssr: true })(Post)
