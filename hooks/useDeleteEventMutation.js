import { gql, useMutation } from '@apollo/client'

export default function useDeleteEventMutation() {
  return useMutation(gql`
    mutation DeleteEvent($id: Float!) {
      deleteEvent(id: $id) {
        errors {
          field
          message
        }
        success
      }
    }
  `)
}
