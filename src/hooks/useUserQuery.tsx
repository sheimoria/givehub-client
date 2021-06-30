import { gql, useQuery } from '@apollo/client'

export default function useUserQuery(id) {
  return useQuery(
    gql`
      query User($id: Float!) {
        user(id: $id) {
          id
          username
          firstName
          lastName
          email
          categories {
            id
          }
          followingCharities {
            id
          }
          adminCharities {
            ids
          }
          likedEvents {
            id
          }
          requestedEvents {
            id
          }
          volunteeringEvents {
            id
          }
          volunteeredEvents {
            id
          }
          createdAt
          updatedAt
        }
      }
    `,
    { variables: { $id: id } }
  )
}
