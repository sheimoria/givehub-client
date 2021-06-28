import { gql, useMutation } from '@apollo/client'

export default function useLogInMutation() {
  return useMutation(gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
      login(usernameOrEmail: $usernameOrEmail, password: $password) {
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
