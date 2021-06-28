import { gql, useQuery } from '@apollo/client'

export default function useUENQuery(UEN) {
  return useQuery(
    gql`
      query UEN($UEN: String!) {
        checkUENNumber(UENNumber: $UEN) {
          errors {
            field
            message
          }
          uendata {
            entity_name
          }
          success
        }
      }
    `,
    { variables: { $UEN: UEN } }
  )
}
