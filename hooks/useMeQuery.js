import { gql, useQuery } from '@apollo/client'

import isServer from 'utils/isServer'

export default function useMeQuery() {
  return useQuery(
    gql`
      query Me {
        me {
          id
          username
          createdCharities {
            id
            name
          }
        }
      }
    `,
    {
      skip: isServer()
    }
  )
}
