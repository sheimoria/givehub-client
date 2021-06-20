import Body from 'components/Body'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import client from 'apollo-client'
import { gql } from '@apollo/client'

export default function Index({ posts }) {
  return (
    <Body title="Welcome">
      <div className="flex flex-col gap-6 md:items-center md:flex-row">
        <section>
          <h1>Volunteer management system for charities</h1>
          <p>
            Givehub is a one-stop platform for Singaporeans to discover
            volunteering opportunities and for charities to manage volunteers.
          </p>
        </section>
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <div>
                <p>{post.creator.username}</p>
                {/* <EditDeletePostButtons id={post.id} creatorId={post.creator.id} /> */}
              </div>
              <Link href={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <p>{post.textSnippet}</p>
              {/* <Like post={post} /> */}
            </article>
          ))}
          <Link href="/login">
            <a>
              Login to view more posts <ChevronRightIcon className="w-5 h-5" />
            </a>
          </Link>
        </section>
      </div>
    </Body>
  )
}

const POSTS = gql`
  {
    posts(limit: 4, cursor: "1623210378909") {
      hasMore
      posts {
        id
        title
        text
        likeNumber
        creator {
          id
          username
        }
        createdAt
        updatedAt
        textSnippet
      }
    }
  }
`

export async function getServerSideProps() {
  const { data } = await client.query({ query: POSTS })

  return {
    props: {
      posts: data.posts.posts
    }
  }
}
