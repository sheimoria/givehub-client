import { gql, useMutation } from '@apollo/client'

export default function useCharitySignUpMutation() {
  return useMutation(gql`
    mutation CharitySignUp($options: CharityDataInput!) {
      createCharity(options: $options) {
        errors {
          field
          message
        }
        charity {
          id
        }
        success
      }
    }
  `)
}
