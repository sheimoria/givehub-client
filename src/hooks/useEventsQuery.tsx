/* import { gql, useQuery } from '@apollo/client'

export default function useEventsQuery(
  limit,
  cursor,
  sortByLikes,
  sortByUpcoming
) {
  return useQuery(
    gql`
      query Events(
        $limit: Int!
        $cursor: String
        $sortByLikes: Boolean!
        $sortByUpcoming: Boolean!
      ) {
        events(
          limit: $limit
          cursor: $cursor
          sortByLikes: $sortByLikes
          sortByUpcoming: $sortByUpcoming
        ) {
          events {
            id
          }
          hasMore
        }
      }
    `,
    {
      variables: {
        limit: limit,
        cursor: cursor,
        sortByLikes: sortByLikes,
        sortByUpcoming: sortByUpcoming
      },
      pollInterval: 500
    }
  )
}
 */