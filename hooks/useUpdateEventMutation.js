import { gql, useMutation } from '@apollo/client'

export default function useUpdateEventMutation() {
  return useMutation(gql`
    mutation UpdateEvent($id: Float!, $input: EventInput!) {
      updateEvent(id: $id, input: $input) {
        errors {
          field
          message
        }
        success
      }
    }
  `)
}
