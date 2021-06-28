import { gql, useMutation } from '@apollo/client'

export default function useCharityCategoryMutation() {
  return useMutation(gql`
    mutation CharityCategory($charityId: Float!, $categories: CategoryInput!) {
      updateCharityCategories(charityId: $charityId, categories: $categories) {
        errors {
          field
          message
        }
        success
      }
    }
  `)
}
