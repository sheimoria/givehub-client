import { gql, useMutation } from '@apollo/client'

export default function useCreateEventMutation() {
  return useMutation(gql`
    mutation CreateEvent($charityId: Float!, $input: EventInput!) {
      createEvent(charityId: $charityId, input: $input) {
        errors {
          field
          message
        }
        success
      }
    }
  `)
}
