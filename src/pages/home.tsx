import Body from 'components/layout/Body'
import CreatePost from 'components/CreatePost'
import Events from 'components/Events'
import withAuth from 'utils/withAuth'

export default withAuth(function Home({ me }) {
  return (
    <Body title="Home" me={me}>
      <CreatePost />
      <Events />
    </Body>
  )
})
