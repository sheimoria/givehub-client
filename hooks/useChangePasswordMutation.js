import { gql, useMutation } from '@apollo/client'

export default function useChangePasswordMutation() {
  return useMutation(gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
      changePassword(token: $token, newPassword: $newPassword) {
        errors {
          field
          message
        }
        user {
          id
          username
        }
      }
    }
  `)
}
