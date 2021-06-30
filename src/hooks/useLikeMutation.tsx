import { gql, useMutation } from '@apollo/client'

export default function useLikeMutation() {
  return useMutation(gql`
    mutation LikeEvent($eventId: Int!) {
      likeEvent(eventId: $eventId)
    }
  `)
}
