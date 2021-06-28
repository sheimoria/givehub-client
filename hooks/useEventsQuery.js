import { gql, useQuery } from '@apollo/client'

export default function useEventsQuery(limit, cursor, sortByLikes) {
  return useQuery(
    gql`
      query Events($limit: Int!, $cursor: String, $sortByLikes: Boolean!) {
        events(limit: $limit, cursor: $cursor, sortByLikes: $sortByLikes) {
          events {
            id
          }
          hasMore
        }
      }
    `,
    {
      variables: { limit: limit, cursor: cursor, sortByLikes: sortByLikes },
      pollInterval: 500
    }
  )
}
