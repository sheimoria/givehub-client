import { gql, useQuery } from '@apollo/client'

export default function useEventQuery(id) {
  return useQuery(
    gql`
      query Event($id: Int!) {
        event(id: $id) {
          id
          name
          description
          dateStart
          dateEnd
          charity {
            id
            name
          }
          likeNumber
        }
      }
    `,
    {
      variables: { id: id },
      pollInterval: 500
    }
  )
}
