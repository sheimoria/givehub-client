import { gql, useQuery } from '@apollo/client'

export default function useCategoryEventsQuery(categoryId) {
  return useQuery(
    gql`
      query CategoryEvents($categories: [Float!]!) {
        eventsByCategories(
          categories: $categories
          limit: 6
          cursor: null
          sortByUpcoming: false
          sortByLikes: false
        ) {
          events {
            id
          }
          hasMore
        }
      }
    `,
    { variables: { categories: [parseInt(categoryId)] } }
  )
}
