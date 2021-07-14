/* import { gql, useQuery } from '@apollo/client'

export default function useCharityQuery(id) {
  return useQuery(
    gql`
      query Charity($id: Int!) {
        charitySearchByID(id: $id) {
          id
          name
          uen
          physicalAddress
          postalcode
          charityEvents {
            id
          }
        }
      }
    `,
    {
      variables: { id: id },
      pollInterval: 500
    }
  )
} */
