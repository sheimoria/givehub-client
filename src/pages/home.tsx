import Body from 'components/layout/Body'
import Events from 'components/events/Events'
import Posts from 'components/posts/Posts'
import React from 'react'
import UserPost from 'components/user/UserPost'
import { UserPostFragmentDoc } from 'generated/graphql'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Home({ me }) {
  const router = useRouter()
  return (
    <Body title="Home" me={me}>
      <UserPost userPost={filter(UserPostFragmentDoc, me)} />
      {!router.query.view ? <Posts /> : <Events />}
    </Body>
  )
})
