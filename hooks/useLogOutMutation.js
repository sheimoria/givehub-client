import { gql, useMutation } from '@apollo/client'

export default function useLogOutMutation() {
  return useMutation(gql`
    mutation LogOut {
      logout
    }
  `)
}
