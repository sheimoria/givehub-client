import { gql, useMutation } from '@apollo/client'

export default function useSignUpMutation() {
  return useMutation(gql`
    mutation Register($options: UsernamePasswordInput!) {
      register(options: $options) {
        errors {
          field
          message
        }
        user {
          id
        }
      }
    }
  `)
}
